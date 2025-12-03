import { EllipsisIcon, ImageIcon, VideoIcon, LayoutGridIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { cn } from '@/lib/utils'

const listItems = ['Teilen', 'Aktualisieren', 'Neu laden']

const tabs = [
  {
    name: 'Bild',
    value: 'image',
    icon: ImageIcon,
    contentData: [
      {
        label: 'Hohes Engagement',
        value: 4250,
        progress: 80
      },
      {
        label: 'Mittleres Engagement',
        value: 2150,
        progress: 60
      },
      {
        label: 'Niedriges Engagement',
        value: 1750,
        progress: 40
      }
    ]
  },
  {
    name: 'Video',
    value: 'video',
    icon: VideoIcon,
    contentData: [
      {
        label: 'Hohe Aufrufe',
        value: 3250,
        progress: 70
      },
      {
        label: 'Mittlere Aufrufe',
        value: 1150,
        progress: 50
      },
      {
        label: 'Niedrige Aufrufe',
        value: 950,
        progress: 30
      }
    ]
  },
  {
    name: 'Karussell',
    value: 'carousel',
    icon: LayoutGridIcon,
    contentData: [
      {
        label: 'Multi-Bild',
        value: 2250,
        progress: 80
      },
      {
        label: 'Produktkatalog',
        value: 1150,
        progress: 50
      },
      {
        label: 'Story-Format',
        value: 950,
        progress: 30
      }
    ]
  }
]

const UserOrderCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn('gap-4', className)}>
      <CardHeader className='flex justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar className='size-9.5 rounded-lg'>
            <AvatarImage
              src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'
              alt='Nike Ads'
              className='rounded-lg'
            />
            <AvatarFallback className='text-xs bg-blue-500 text-white'>NA</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-1'>
            <span className='text-xl font-medium'>Nike Ads</span>
            <span className='text-muted-foreground text-sm'>Aktive Kampagne</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='text-muted-foreground size-6 rounded-full'>
              <EllipsisIcon />
              <span className='sr-only'>Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuGroup>
              {listItems.map((item, index) => (
                <DropdownMenuItem key={index}>{item}</DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col gap-6'>
        <Separator />
        <div className='flex flex-1 flex-col gap-2'>
          <div className='flex items-baseline gap-2'>
            <span className='text-2xl font-medium'>12.847</span>
            <span className='text-muted-foreground text-sm'>Anzeigen verfolgt</span>
          </div>
          <Tabs defaultValue='image' className='flex-1 justify-between gap-6'>
            <TabsList className='w-full'>
              {tabs.map(({ icon: Icon, name, value }) => (
                <TabsTrigger key={value} value={value} className='flex items-center gap-1 px-1.5'>
                  <Icon />
                  <span className='max-sm:hidden'>{name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map(tab => (
              <TabsContent key={tab.value} value={tab.value} className='flex flex-col justify-evenly gap-6'>
                {tab.contentData?.map((item, index) => (
                  <div key={index} className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span>{item.label}</span>
                      <span className='text-muted-foreground text-sm'>{item.value}</span>
                    </div>
                    <Progress value={item.progress} />
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserOrderCard
