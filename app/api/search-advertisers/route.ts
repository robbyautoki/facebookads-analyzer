import { NextRequest, NextResponse } from "next/server"

export interface AdvertiserSuggestion {
  name: string
  id: string
  region: string
  ads_count: {
    lower: number
    upper: number
  }
  is_verified: boolean
}

export interface DomainSuggestion {
  name: string
}

export interface SearchResponse {
  advertisers: AdvertiserSuggestion[]
  domains: DomainSuggestion[]
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")

  if (!query || query.length < 2) {
    return NextResponse.json({ advertisers: [], domains: [] })
  }

  const apiKey = process.env.SEARCHAPI_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: "SEARCHAPI_KEY not configured" },
      { status: 500 }
    )
  }

  try {
    const url = new URL("https://www.searchapi.io/api/v1/search")
    url.searchParams.set("engine", "google_ads_transparency_center_advertiser_search")
    url.searchParams.set("q", query)
    url.searchParams.set("api_key", apiKey)
    url.searchParams.set("num_advertisers", "10")
    url.searchParams.set("num_domains", "5")
    url.searchParams.set("region", "DE")

    const response = await fetch(url.toString(), {
      headers: {
        "Accept": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("SearchAPI error:", errorText)
      return NextResponse.json(
        { error: "Failed to search advertisers" },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      advertisers: data.advertisers || [],
      domains: data.domains || [],
    })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
