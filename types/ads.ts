// Types for Facebook Ads Library Scraper data

export interface AgeGenderBreakdown {
  age_range: string
  female?: number
  male?: number
  unknown?: number
}

export interface CountryBreakdown {
  country: string
  age_gender_breakdowns: AgeGenderBreakdown[]
}

export interface LocationAudience {
  excluded: boolean
  name: string
  num_obfuscated: number
  type: string
}

export interface AgeAudience {
  min?: number
  max?: number
}

export interface AudienceInfo {
  age_min?: number
  age_max?: number
  age_audience?: AgeAudience
  gender_audience?: string
  eu_total_reach?: number
  location_audience?: LocationAudience[]
  age_country_gender_reach_breakdown?: CountryBreakdown[]
}

export interface AdvertiserPageInfo {
  entity_type?: string
  ig_followers?: number
  ig_username?: string
  ig_verification?: string
  is_profile_page?: boolean
  likes?: number
  page_alias?: string
  page_category?: string
  page_cover_photo?: string
  page_id?: string
  page_is_deleted?: boolean
  page_is_restricted?: boolean
  page_name?: string
  page_profile_uri?: string
  page_verification?: string
  profile_photo?: string
}

export interface Advertiser {
  ad_library_page_info?: {
    page_info?: AdvertiserPageInfo
    page_spend?: {
      current_week?: string
      is_political_page?: boolean
    }
  }
  page?: {
    about?: {
      text?: string
    }
    id?: string
    is_delegate_page_with_linked_primary_profile?: boolean
  }
}

export interface SnapshotCard {
  body?: string
  caption?: string
  cta_text?: string
  cta_type?: string
  link_description?: string
  link_url?: string
  original_image_url?: string
  resized_image_url?: string
  title?: string
  video_hd_url?: string
  video_preview_image_url?: string
  video_sd_url?: string
  watermarked_resized_image_url?: string
  watermarked_video_hd_url?: string
  watermarked_video_sd_url?: string
}

export interface SnapshotImage {
  original_image_url?: string
  resized_image_url?: string
  watermarked_resized_image_url?: string
}

export interface SnapshotVideo {
  video_hd_url?: string
  video_preview_image_url?: string
  video_sd_url?: string
  watermarked_video_hd_url?: string
  watermarked_video_sd_url?: string
}

export interface AdSnapshot {
  additional_info?: string
  body?: {
    text?: string
  }
  branded_content?: string
  brazil_tax_id?: string
  byline?: string
  caption?: string
  cards?: SnapshotCard[]
  country_iso_code?: string
  cta_text?: string
  cta_type?: string
  current_page_name?: string
  disclaimer_label?: string
  display_format?: string
  event?: string
  images?: SnapshotImage[]
  is_reshared?: boolean
  link_description?: string
  link_url?: string
  page_categories?: string[]
  page_entity_type?: string
  page_id?: string
  page_is_deleted?: boolean
  page_is_profile_page?: boolean
  page_like_count?: number
  page_name?: string
  page_profile_picture_url?: string
  page_profile_uri?: string
  root_reshared_post?: string
  title?: string
  videos?: SnapshotVideo[]
}

export interface FacebookAd {
  // Identifiers
  ad_archive_id?: string
  ad_id?: string
  ad_library_url?: string
  collation_id?: string
  collation_count?: number

  // Advertiser info
  advertiser?: Advertiser
  page_id?: string
  page_name?: string
  page_is_deleted?: boolean

  // Ad metadata
  ads_count?: number
  categories?: string[]
  contains_digital_created_media?: boolean
  contains_sensitive_content?: boolean
  currency?: string
  entity_type?: string

  // Status & dates
  is_active?: boolean
  start_date?: string
  start_date_formatted?: string
  end_date?: string
  end_date_formatted?: string
  total_active_time?: string

  // Reach & impressions
  reach_estimate?: number
  impressions_with_index?: {
    impressions_index?: string
    impressions_text?: string
  }
  spend?: string

  // Platforms
  publisher_platform?: string[]

  // Content
  snapshot?: AdSnapshot

  // Audience targeting (AAA info)
  aaa_info?: AudienceInfo

  // EU transparency
  transparency_by_location?: {
    eu_transparency?: AudienceInfo
    br_transparency?: unknown
    uk_transparency?: unknown
  }

  // Other
  is_aaa_eligible?: boolean
  is_violating_eu_siep?: boolean
  gated_type?: string
  has_user_reported?: boolean
  hidden_safety_data?: boolean
  hide_data_status?: string
  report_count?: number
  state_media_run_label?: string
  total?: number
  url?: string
  verified_voice_context?: string
}

// Transformed/simplified types for UI

export interface SimpleAd {
  id: string
  title: string
  body: string
  imageUrl?: string
  videoPreviewUrl?: string
  videoUrl?: string
  isActive: boolean
  startDate?: string
  endDate?: string
  platforms: string[]
  ctaText?: string
  ctaType?: string
  linkUrl?: string
  reach?: number
  impressions?: string
  displayFormat?: string
}

export interface SimpleAdvertiser {
  id: string
  name: string
  category?: string
  likes?: number
  profilePhoto?: string
  coverPhoto?: string
  about?: string
  pageUrl?: string
  verification?: string
  totalAds: number
  activeAds: number
}

export interface SimpleAudience {
  ageMin?: number
  ageMax?: number
  gender?: string
  totalReach?: number
  countries: {
    name: string
    reach?: number
  }[]
  ageGenderBreakdown?: {
    ageRange: string
    female?: number
    male?: number
    unknown?: number
  }[]
}

export interface AdvertiserAnalysis {
  advertiser: SimpleAdvertiser
  ads: SimpleAd[]
  audience: SimpleAudience
  rawData: FacebookAd[]
}

// API response types

export interface ApifyRunResponse {
  data: {
    id: string
    status: string
    defaultDatasetId: string
  }
}

export interface ApifyRunStatus {
  data: {
    status: 'READY' | 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'ABORTING' | 'ABORTED' | 'TIMING-OUT' | 'TIMED-OUT'
    defaultDatasetId: string
  }
}

export interface ScrapeAdsRequest {
  advertiserName: string
  period?: 'last24h' | 'last7d' | 'last30d' | 'last90d' | 'all'
  countryCode?: string
  limit?: number
  forceRefresh?: boolean // Cache ignorieren und neu laden
}

export interface ScrapeAdsResponse {
  success: boolean
  data?: AdvertiserAnalysis
  error?: string
  fromCache?: boolean // Zeigt an ob Daten aus Cache kommen
}
