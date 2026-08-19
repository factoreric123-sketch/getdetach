import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const StartUsingDetachEmail = () => (
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
          Download Detach at https://getdetach.app and temporarily set your number of Emergency
          Unlocks to a higher amount. Until your card arrives, you can use an Emergency Unlock
          whenever you need to end a blocking session.
        </Text>

        <Text style={text}>
          Once your Detach card arrives, you can lower the number of Emergency Unlocks and use the
          card to unlock your apps instead.
        </Text>

        <Text style={text}>
          This lets you start building better habits right away while your card is on the way.
        </Text>

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
  previewData: {},
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '40px 24px', maxWidth: '580px', margin: '0 auto' }
const h1 = { fontSize: '20px', color: '#111', margin: '0 0 24px', lineHeight: '1.4' }
const text = { fontSize: '15px', color: '#222', margin: '0 0 20px', lineHeight: '1.6' }
const hr = { borderColor: '#eee', margin: '24px 0' }
const footer = { fontSize: '13px', color: '#999', margin: '0' }
