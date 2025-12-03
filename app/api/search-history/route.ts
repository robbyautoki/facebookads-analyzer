import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
    }

    const searches = await prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { searchedAt: "desc" },
      take: 20,
    })

    return NextResponse.json(searches)
  } catch (error) {
    console.error("Fehler beim Abrufen des Suchverlaufs:", error)
    return NextResponse.json(
      { error: "Interner Serverfehler" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
    }

    const body = await request.json()
    const { advertiserName, advertiserId, category, totalAds, activeAds, cachedData } = body

    if (!advertiserName) {
      return NextResponse.json(
        { error: "Werbetreibender Name ist erforderlich" },
        { status: 400 }
      )
    }

    // Prüfen ob diese Suche schon existiert (case-insensitive)
    const existingSearch = await prisma.searchHistory.findFirst({
      where: {
        userId,
        advertiserName: {
          equals: advertiserName,
          mode: 'insensitive',
        },
      },
    })

    if (existingSearch) {
      // Aktualisiere bestehenden Eintrag mit neuen Daten und Cache
      const updated = await prisma.searchHistory.update({
        where: { id: existingSearch.id },
        data: {
          advertiserId,
          category,
          totalAds,
          activeAds,
          searchedAt: new Date(),
          // Nur cachedData aktualisieren wenn übergeben
          ...(cachedData && {
            cachedData,
            cachedAt: new Date(),
          }),
        },
      })
      return NextResponse.json(updated)
    }

    // Neue Suche speichern
    const search = await prisma.searchHistory.create({
      data: {
        userId,
        advertiserName,
        advertiserId,
        category,
        totalAds,
        activeAds,
        // Nur cachedData speichern wenn übergeben
        ...(cachedData && {
          cachedData,
          cachedAt: new Date(),
        }),
      },
    })

    return NextResponse.json(search)
  } catch (error) {
    console.error("Fehler beim Speichern der Suche:", error)
    return NextResponse.json(
      { error: "Interner Serverfehler" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "ID ist erforderlich" },
        { status: 400 }
      )
    }

    // Prüfen ob der Eintrag dem User gehört
    const search = await prisma.searchHistory.findFirst({
      where: { id, userId },
    })

    if (!search) {
      return NextResponse.json(
        { error: "Suche nicht gefunden" },
        { status: 404 }
      )
    }

    await prisma.searchHistory.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Fehler beim Löschen der Suche:", error)
    return NextResponse.json(
      { error: "Interner Serverfehler" },
      { status: 500 }
    )
  }
}
