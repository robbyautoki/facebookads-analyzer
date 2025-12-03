import { NextRequest, NextResponse } from 'next/server'
import type {
  FacebookAd,
  ScrapeAdsRequest,
  ScrapeAdsResponse,
  AdvertiserAnalysis,
  SimpleAd,
  SimpleAdvertiser,
  SimpleAudience,
  ApifyRunResponse,
  ApifyRunStatus,
} from '@/types/ads'

const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN
const APIFY_ACTOR_ID = 'curious_coder~facebook-ads-library-scraper'
const APIFY_BASE_URL = 'https://api.apify.com/v2'

// Helper to wait
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Transform raw Facebook Ad data to simplified format
function transformAd(ad: FacebookAd, index: number): SimpleAd {
  const snapshot = ad.snapshot

  // Get image URL (prioritize cards, then images array)
  let imageUrl = snapshot?.images?.[0]?.resized_image_url
  if (!imageUrl && snapshot?.cards?.[0]) {
    imageUrl = snapshot.cards[0].resized_image_url
  }

  // Get video URLs
  let videoPreviewUrl = snapshot?.videos?.[0]?.video_preview_image_url
  let videoUrl = snapshot?.videos?.[0]?.video_sd_url || snapshot?.videos?.[0]?.video_hd_url
  if (!videoPreviewUrl && snapshot?.cards?.[0]) {
    videoPreviewUrl = snapshot.cards[0].video_preview_image_url
    videoUrl = snapshot.cards[0].video_sd_url || snapshot.cards[0].video_hd_url
  }

  return {
    id: ad.ad_archive_id || ad.ad_id || `ad-${index}`,
    title: snapshot?.title || ad.page_name || 'Untitled Ad',
    body: snapshot?.body?.text || '',
    imageUrl,
    videoPreviewUrl,
    videoUrl,
    isActive: ad.is_active ?? false,
    startDate: ad.start_date_formatted,
    endDate: ad.end_date_formatted,
    platforms: ad.publisher_platform || [],
    ctaText: snapshot?.cta_text,
    ctaType: snapshot?.cta_type,
    linkUrl: snapshot?.link_url,
    reach: ad.aaa_info?.eu_total_reach || ad.transparency_by_location?.eu_transparency?.eu_total_reach,
    impressions: ad.impressions_with_index?.impressions_text,
    displayFormat: snapshot?.display_format,
  }
}

// Extract advertiser info from first ad
function extractAdvertiser(ads: FacebookAd[]): SimpleAdvertiser {
  const firstAd = ads[0]
  const pageInfo = firstAd?.advertiser?.ad_library_page_info?.page_info

  const activeAds = ads.filter(ad => ad.is_active).length

  return {
    id: pageInfo?.page_id || firstAd?.page_id || 'unknown',
    name: pageInfo?.page_name || firstAd?.page_name || 'Unknown Advertiser',
    category: pageInfo?.page_category,
    likes: pageInfo?.likes,
    profilePhoto: pageInfo?.profile_photo,
    coverPhoto: pageInfo?.page_cover_photo,
    about: firstAd?.advertiser?.page?.about?.text,
    pageUrl: pageInfo?.page_profile_uri,
    verification: pageInfo?.page_verification,
    totalAds: ads.length,
    activeAds,
  }
}

// Extract audience insights
function extractAudience(ads: FacebookAd[]): SimpleAudience {
  // Aggregate audience data from all ads
  const firstAdWithAudience = ads.find(ad => ad.aaa_info?.age_audience || ad.transparency_by_location?.eu_transparency)
  const audienceInfo = firstAdWithAudience?.aaa_info || firstAdWithAudience?.transparency_by_location?.eu_transparency

  // Collect all countries
  const countryMap = new Map<string, number>()
  ads.forEach(ad => {
    const locations = ad.aaa_info?.location_audience || ad.transparency_by_location?.eu_transparency?.location_audience
    locations?.forEach(loc => {
      if (loc.name && !loc.excluded) {
        const current = countryMap.get(loc.name) || 0
        countryMap.set(loc.name, current + 1)
      }
    })
  })

  // Get age/gender breakdown from first ad with data
  const breakdown = audienceInfo?.age_country_gender_reach_breakdown?.[0]?.age_gender_breakdowns

  return {
    ageMin: audienceInfo?.age_min,
    ageMax: audienceInfo?.age_max,
    gender: audienceInfo?.gender_audience,
    totalReach: ads.reduce((sum, ad) => {
      const reach = ad.aaa_info?.eu_total_reach || ad.transparency_by_location?.eu_transparency?.eu_total_reach || 0
      return sum + reach
    }, 0),
    countries: Array.from(countryMap.entries()).map(([name, count]) => ({ name, reach: count })),
    ageGenderBreakdown: breakdown?.map(b => ({
      ageRange: b.age_range,
      female: b.female,
      male: b.male,
      unknown: b.unknown,
    })),
  }
}

// Transform raw data to analysis format
function transformToAnalysis(rawAds: FacebookAd[]): AdvertiserAnalysis {
  return {
    advertiser: extractAdvertiser(rawAds),
    ads: rawAds.map((ad, index) => transformAd(ad, index)),
    audience: extractAudience(rawAds),
    rawData: rawAds,
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ScrapeAdsResponse>> {
  try {
    if (!APIFY_API_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'APIFY_API_TOKEN not configured' },
        { status: 500 }
      )
    }

    const body: ScrapeAdsRequest = await request.json()
    const { advertiserName, period = 'last30d', countryCode = 'ALL', limit = 100 } = body

    if (!advertiserName || advertiserName.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Advertiser name is required' },
        { status: 400 }
      )
    }

    // Build Facebook Ads Library URL
    const encodedName = encodeURIComponent(advertiserName.trim())
    const fbUrl = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=${countryCode}&is_targeted_country=false&media_type=all&q=${encodedName}&search_type=keyword_unordered`

    // Apify input configuration
    const apifyInput = {
      count: limit,
      limitPerSource: 100,
      period,
      scrapeAdDetails: true,
      'scrapePageAds.activeStatus': 'all',
      'scrapePageAds.countryCode': countryCode,
      urls: [{ url: fbUrl }],
    }

    // Start the Apify actor run
    const runResponse = await fetch(
      `${APIFY_BASE_URL}/acts/${APIFY_ACTOR_ID}/runs?token=${APIFY_API_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apifyInput),
      }
    )

    if (!runResponse.ok) {
      const errorText = await runResponse.text()
      console.error('Apify run start failed:', errorText)
      return NextResponse.json(
        { success: false, error: 'Failed to start scraper' },
        { status: 500 }
      )
    }

    const runData: ApifyRunResponse = await runResponse.json()
    const runId = runData.data.id

    // Poll for completion (max 5 minutes)
    const maxWaitTime = 5 * 60 * 1000 // 5 minutes
    const pollInterval = 5000 // 5 seconds
    const startTime = Date.now()

    let status: ApifyRunStatus['data']['status'] = 'RUNNING'
    let datasetId: string | undefined

    while (Date.now() - startTime < maxWaitTime) {
      await sleep(pollInterval)

      const statusResponse = await fetch(
        `${APIFY_BASE_URL}/actor-runs/${runId}?token=${APIFY_API_TOKEN}`
      )

      if (!statusResponse.ok) {
        continue
      }

      const statusData: ApifyRunStatus = await statusResponse.json()
      status = statusData.data.status
      datasetId = statusData.data.defaultDatasetId

      if (status === 'SUCCEEDED') {
        break
      }

      if (status === 'FAILED' || status === 'ABORTED' || status === 'TIMED-OUT') {
        return NextResponse.json(
          { success: false, error: `Scraper ${status.toLowerCase()}` },
          { status: 500 }
        )
      }
    }

    if (status !== 'SUCCEEDED') {
      return NextResponse.json(
        { success: false, error: 'Scraper timed out' },
        { status: 504 }
      )
    }

    // Fetch the dataset items
    const datasetResponse = await fetch(
      `${APIFY_BASE_URL}/datasets/${datasetId}/items?token=${APIFY_API_TOKEN}&format=json`
    )

    if (!datasetResponse.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch results' },
        { status: 500 }
      )
    }

    const rawAds: FacebookAd[] = await datasetResponse.json()

    if (!rawAds || rawAds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No ads found for this advertiser' },
        { status: 404 }
      )
    }

    // Transform data
    const analysis = transformToAnalysis(rawAds)

    return NextResponse.json({ success: true, data: analysis })

  } catch (error) {
    console.error('Scrape ads error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
