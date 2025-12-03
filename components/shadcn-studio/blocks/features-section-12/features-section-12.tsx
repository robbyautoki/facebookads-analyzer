import { RocketIcon } from 'lucide-react'

import * as motion from 'motion/react-client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'

import LogoVector from '@/assets/svg/logo-vector'

import { MotionPreset } from '@/components/ui/motion-preset'
import { Marquee } from '@/components/ui/marquee'

const avatars = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'OS',
    name: 'Olivia Sparks'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'HL',
    name: 'Howard Lloyd'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'HR',
    name: 'Hallie Richards'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
    fallback: 'JW',
    name: 'Jenny Wilson'
  }
]

const Features = () => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <MotionPreset
            component='h2'
            className='text-2xl font-semibold md:text-3xl lg:text-4xl'
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            transition={{ duration: 0.5 }}
          >
            Entwickelt für professionelle Anzeigen-Analyse
          </MotionPreset>
          <MotionPreset
            component='p'
            className='text-muted-foreground text-xl'
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            delay={0.3}
            transition={{ duration: 0.5 }}
          >
            Nutze Technologie um Wettbewerbs-Insights einfacher und effektiver zu gewinnen.
          </MotionPreset>

          <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.6} transition={{ duration: 0.5 }}>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              <Button size='lg' className='rounded-lg text-base has-[>svg]:px-6'>
                Jetzt starten <RocketIcon />
              </Button>
              <Button
                size='lg'
                className='bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 rounded-lg !px-6 text-base'
              >
                Mehr erfahren
              </Button>
            </div>
          </MotionPreset>
        </div>

        <div className='relative grid grid-cols-1 gap-6 md:grid-cols-2 md:before:absolute md:before:inset-y-0 md:before:z-[-1] md:before:w-full md:before:overflow-x-auto md:before:bg-[url(https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-40.png)] md:before:bg-contain md:before:bg-right md:before:bg-no-repeat lg:grid-cols-3'>
          {/*  Card 1 */}
          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} blur delay={0.8} transition={{ duration: 0.9 }}>
            <Card className='h-full shadow-none'>
              <CardContent className='flex flex-col gap-4'>
                <div className='bg-muted flex h-72 w-full flex-col items-center justify-center rounded-md'>
                  <div className='flex flex-col items-center'>
                    <h4 className='text-5xl font-semibold'>12k+</h4>
                    <p className='text-muted-foreground mb-2.5'>zufriedene Nutzer</p>
                    <div className='flex -space-x-2 hover:space-x-2'>
                      {avatars.map((avatar, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <Avatar className='ring-background size-12 ring-2 transition-all duration-300 ease-in-out hover:z-1 hover:-translate-y-1 hover:scale-120'>
                              <AvatarImage src={avatar.src} alt={avatar.name} />
                              <AvatarFallback className='text-xs'>{avatar.fallback}</AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent side='bottom'>{avatar.name}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='space-y-2'>
                  <CardTitle className='text-lg font-semibold'>Schnell & Professionell</CardTitle>
                  <CardDescription className='text-base'>
                    Entwickelt für schnelle Performance und nahtlose Nutzererfahrung.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>

          {/*  Card 2 */}
          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} blur delay={1} transition={{ duration: 0.9 }}>
            <Card className='h-full shadow-none'>
              <CardContent className='flex flex-col gap-4'>
                <div className='bg-muted flex h-72 w-full items-center justify-center rounded-md'>
                  <div className='flex w-full max-w-58.5 flex-col items-start gap-4'>
                    <div className='flex -space-x-2 hover:space-x-2'>
                      {avatars.map((avatar, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <Avatar className='ring-background size-12 ring-2 transition-all duration-300 ease-in-out hover:z-1 hover:-translate-y-1 hover:scale-120'>
                              <AvatarImage src={avatar.src} alt={avatar.name} />
                              <AvatarFallback className='text-xs'>{avatar.fallback}</AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>{avatar.name}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                    <div>
                      <h4 className='text-lg font-semibold'>Top Marketer</h4>
                      <p className='text-muted-foreground'>Community der besten Performance-Marketer.</p>
                    </div>
                    <div className='flex gap-2'>
                      <Badge className='rounded-md'>Analyse</Badge>
                      <Badge className='rounded-md'>Tracking</Badge>
                      <Badge className='rounded-md'>Ads</Badge>
                      <Badge className='rounded-md'>Insights</Badge>
                    </div>
                  </div>
                </div>
                <div className='space-y-2'>
                  <CardTitle className='text-lg font-semibold'>Nutzerfreundlich</CardTitle>
                  <CardDescription className='text-base'>
                    Entwickelt damit du mühelos navigieren und analysieren kannst.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>

          {/*  Card 3 */}
          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} blur delay={1.2} transition={{ duration: 0.9 }}>
            <Card className='h-full shadow-none'>
              <CardContent className='flex flex-col gap-4'>
                <div className='bg-muted flex h-72 w-full flex-col items-center justify-center overflow-hidden rounded-md'>
                  <Marquee pauseOnHover duration={20} reverse className='-rotate-6 items-center gap-6'>
                    <div className='flex flex-col gap-5'>
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-53.png'
                        alt='discord'
                        className='size-13 shrink-0 object-contain'
                      />
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-52.png'
                        alt='wii'
                        className='size-13 shrink-0 object-contain'
                      />
                    </div>
                    <div className='mt-3.5 flex flex-col gap-5'>
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-51.png'
                        alt='Star Health'
                        className='size-13 shrink-0 object-contain'
                      />
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-50.png'
                        alt='arrow'
                        className='size-13 shrink-0 object-contain'
                      />
                    </div>
                    <div className='flex flex-col gap-5'>
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-49.png'
                        alt='twiter'
                        className='size-13 shrink-0 object-contain'
                      />
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-48.png'
                        alt='star'
                        className='size-13 shrink-0 object-contain'
                      />
                    </div>
                    <div className='mt-3.5 flex flex-col gap-5'>
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-47.png'
                        alt='stripe'
                        className='size-13 shrink-0 object-contain'
                      />
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-46.png'
                        alt='slack'
                        className='size-13 shrink-0 object-contain'
                      />
                    </div>
                    <div className='flex flex-col gap-5'>
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-45.png'
                        alt='insta'
                        className='size-13 shrink-0 object-contain'
                      />
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-44.png'
                        alt='facebook'
                        className='size-13 shrink-0 object-contain'
                      />
                    </div>
                    <div className='mt-3.5 flex flex-col gap-5'>
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-43.png'
                        alt='ai'
                        className='size-13 shrink-0 object-contain'
                      />
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-42.png'
                        alt='youtube'
                        className='size-13 shrink-0 object-contain'
                      />
                    </div>
                    <div className='flex flex-col gap-5'>
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-41.png'
                        alt='green'
                        className='size-13 shrink-0 object-contain'
                      />
                      <img
                        src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-54.png'
                        alt='chart'
                        className='size-13 shrink-0 object-contain'
                      />
                    </div>
                  </Marquee>
                </div>
                <div className='space-y-2'>
                  <CardTitle className='text-lg font-semibold'>Optimiert für Echtzeit-Tracking</CardTitle>
                  <CardDescription className='text-base'>
                    Ein reaktionsschnelles System für schnelle, flüssige und stabile Aktionen.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>

          {/*  Card 4  */}
          <MotionPreset
            className='group md:col-span-2 md:max-lg:order-1'
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            delay={1.4}
            transition={{ duration: 0.9 }}
          >
            <Card className='shadow-none md:h-full'>
              <CardContent className='flex flex-col gap-4'>
                <div className='bg-muted h-40 w-full overflow-hidden rounded-md sm:h-72'>
                  <div className='relative size-full p-6'>
                    <img
                      src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-25.png'
                      alt='admin'
                      className='absolute -bottom-2 left-1/2 mt-auto max-w-60 -translate-x-1/2 transition-transform duration-300 sm:-bottom-6 sm:max-w-110 sm:group-hover:scale-105 md:max-w-140'
                    />
                    <div className='from-muted/90 to-muted/5 absolute bottom-0 z-1 h-9 w-full bg-linear-to-t'></div>
                  </div>
                </div>
                <div className='space-y-2'>
                  <CardTitle className='text-lg font-semibold'>Intelligent, Skalierbar & Leistungsstark</CardTitle>
                  <CardDescription className='text-base'>
                    Mit robuster Architektur entwickelt, die mit deinen Anforderungen wächst und jede Analyse-Aufgabe
                    reibungslos bewältigt.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>

          {/*  Card 5 */}
          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} blur delay={1.6} transition={{ duration: 0.9 }}>
            <Card className='h-full shadow-none'>
              <CardContent className='flex flex-col gap-4'>
                <div className='bg-muted relative flex h-72 w-full flex-col items-center justify-center rounded-md'>
                  <motion.svg
                    width='1em'
                    height='1em'
                    viewBox='0 0 247 247'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='relative size-full'
                    initial='hidden'
                    animate='visible'
                  >
                    <motion.circle
                      cx='123.5'
                      cy='123.5'
                      r='60'
                      fill='color-mix(in oklab, var(--primary) 25%, transparent)'
                      variants={{
                        visible: {
                          scale: [1, 0.85, 1],
                          transition: {
                            scale: { delay: 0.24, duration: 3.75, repeat: Infinity, ease: 'easeOut' }
                          }
                        }
                      }}
                    />

                    <motion.circle
                      cx='123.5'
                      cy='123.5'
                      r='90'
                      fill='color-mix(in oklab, var(--primary) 15%, transparent)'
                      variants={{
                        visible: {
                          scale: [1, 0.85, 1],
                          transition: {
                            scale: { delay: 0.12, duration: 3.75, repeat: Infinity, ease: 'easeOut' }
                          }
                        }
                      }}
                    />
                    <motion.circle
                      cx='123.5'
                      cy='123.5'
                      r='120'
                      fill='color-mix(in oklab, var(--primary) 5%, transparent)'
                      variants={{
                        visible: {
                          scale: [1, 0.85, 1],
                          transition: {
                            scale: { duration: 3.75, repeat: Infinity, ease: 'easeOut' }
                          }
                        }
                      }}
                    />
                  </motion.svg>
                  <div className='bg-primary border-background absolute top-1/2 left-1/2 z-1 flex size-20 -translate-1/2 items-center justify-center rounded-full border-2'>
                    <LogoVector className='size-19 text-white dark:text-black' />
                  </div>
                </div>
                <div className='space-y-2'>
                  <CardTitle className='text-lg font-semibold'>Plattform-Integrationen</CardTitle>
                  <CardDescription className='text-base'>
                    Gewinne Insights und triff fundierte Entscheidungen mit leistungsstarken Analyse-Features.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default Features
