import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const PaymentFailedFollowupEmail = () => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your Detach order didn't go through</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Your Detach order didn't go through</Heading>

        <Text style={text}>Hi,</Text>

        <Text style={text}>
          It looks like your payment didn't go through, so your Detach order wasn't completed.
        </Text>

        <Text style={text}>
          If you still want one, you can try again here: https://getdetach.app/
        </Text>

        <Text style={text}>
          Sometimes payments fail because of a temporary bank or card issue, so trying again usually
          fixes it.
        </Text>

        <Text style={text}>
          If you have any trouble placing your order, just reply to this email and I'll help you out.
        </Text>

        <Text style={text}>
          Thanks,
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
  component: PaymentFailedFollowupEmail,
  subject: "Your Detach order didn't go through",
  displayName: 'Payment failed follow-up',
  previewData: {},
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '40px 24px', maxWidth: '580px', margin: '0 auto' }
const h1 = { fontSize: '20px', color: '#111', margin: '0 0 24px', lineHeight: '1.4' }
const text = { fontSize: '15px', color: '#222', margin: '0 0 20px', lineHeight: '1.6' }
const hr = { borderColor: '#eee', margin: '24px 0' }
const footer = { fontSize: '13px', color: '#999', margin: '0' }
