import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Html, Link, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface ReviewOfferProps {
  customerName?: string
}

const ReviewOfferEmail = ({ customerName }: ReviewOfferProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Leave a review and we'll include an extra Detach card in your envelope</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={text}>{customerName ? `Hi ${customerName},` : 'Hi,'}</Text>

        <Text style={text}><strong>Want an extra Detach card?</strong></Text>

        <Text style={text}>
          We'd love to hear your feedback! If you leave a review on the{' '}
          <strong>App Store or Google Play</strong>, just email us at{' '}
          <Link href="mailto:getdetach@gmail.com" style={{ color: '#222', textDecoration: 'none' }}>
            <strong>getdetach@gmail.com</strong>
          </Link>{' '}
          and let us know you did. You can include a screenshot or confirmation if you'd like.
        </Text>

        <Text style={text}>
          As a thank you, we'll include an <strong>extra Detach card</strong> in your envelope.
        </Text>

        <Text style={text}>
          If you'd like to take advantage of this offer, please let us know{' '}
          <strong>before your order ships</strong> so I can include the extra card in the same shipment.
        </Text>

        <Text style={text}>
          Thanks again for your support!
        </Text>

        <Text style={closing}>
          Eric
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
  component: ReviewOfferEmail,
  subject: 'Want an Extra Detach Card?',
  displayName: 'Review offer',
  previewData: { customerName: 'Jane' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '40px 24px', maxWidth: '580px', margin: '0 auto' }
const text = { fontSize: '15px', color: '#222', margin: '0 0 24px', lineHeight: '1.6' }
const closing = { fontSize: '15px', color: '#222', margin: '0 0 24px', lineHeight: '1.6' }
const hr = { borderColor: '#eee', margin: '24px 0' }
const footer = { fontSize: '13px', color: '#999', margin: '0' }
