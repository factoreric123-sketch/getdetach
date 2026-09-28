import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Img, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface StartUsingDetachProps {
  qrCode?: string
  qrImageUrl?: string
}

const StartUsingDetachEmail = ({ qrCode, qrImageUrl }: StartUsingDetachProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You can start using Detach today, before your card arrives</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Start Using Detach Before Your Card Arrives</Heading>

        <Text style={text}>Hi,</Text>

        <Text style={text}>
          You don't have to wait for your Detach card to arrive before you start using the app.
        </Text>

        <Text style={text}>
          Download Detach at <Link href="https://getdetach.app" style={link}>https://getdetach.app</Link>, then go to Settings and turn on Use a QR Code.
        </Text>

        <Text style={text}>
          This lets you use the QR code included with this email instead of tapping your Detach card. When you want to end a blocking session, simply scan the QR code with your phone.
        </Text>

        {qrImageUrl && qrCode ? (
          <>
            <Img src={qrImageUrl} width="220" height="220" alt="Your Detach QR code" style={qrImage} />
            <Text style={text}>Your QR code: <strong>{qrCode}</strong></Text>
          </>
        ) : null}

        <Text style={text}>If you're on Android, you do not need a code to enable the QR feature.</Text>

        <Text style={text}>If you're on iOS, enter this code to enable it: <strong>000026</strong></Text>

        <Text style={text}>You can also print out the QR code, cut out a small piece of cardboard, and tape the QR code onto it. Then you can use it like a temporary Detach card until your real one arrives.</Text>

        <Text style={text}>Once your Detach card arrives, you can switch back to using the physical card whenever you'd like.</Text>

        <Text style={text}>This way, you can start using Detach right away while your card is on the way.</Text>

        <Text style={text}>
          <strong>Best Practice</strong>: Block Social Media in the Morning
        </Text>

        <Text style={text}>
          Use Detach scheduling to block social media before you wake up.
        </Text>

        <Text style={text}>
          Reaching for social media first thing can start the scrolling and reward cycle early,
          making it harder to stay focused throughout the day. What you do in the morning often sets
          the tone for the rest of your day.
        </Text>

        <Text style={text}>
          Try giving yourself at least one to two hours after waking up before accessing social
          media.
        </Text>

        <Text style={text}>
          Best,
          <br />
          Detach
        </Text>

        <Hr style={hr} />

        <Text style={footer}>
          Questions? Reply to this email or contact us at getdetach@gmail.com
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: StartUsingDetachEmail,
  subject: 'Start Using Detach Before Your Card Arrives',
  displayName: 'Start using Detach',
  previewData: { qrCode: '383894', qrImageUrl: 'https://getdetach.app/favicon.png' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '40px 24px', maxWidth: '580px', margin: '0 auto' }
const h1 = { fontSize: '20px', color: '#111', margin: '0 0 24px', lineHeight: '1.4' }
const text = { fontSize: '15px', color: '#222', margin: '0 0 20px', lineHeight: '1.6' }
const link = { color: '#222', textDecoration: 'none' }
const qrImage = { display: 'block', margin: '0 0 12px' }
const hr = { borderColor: '#eee', margin: '24px 0' }
const footer = { fontSize: '13px', color: '#999', margin: '0' }
