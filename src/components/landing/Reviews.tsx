import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Marcus T.",
    rating: 5,
    title: "Finally, something that works",
    body: "I've tried every screen time app out there. Detach is the first one I haven't been able to bypass in 30 seconds. The card lives on my desk and Instagram stays gone until I tap it.",
  },
  {
    name: "Priya S.",
    rating: 5,
    title: "Got my mornings back",
    body: "I keep the card in another room overnight. No more doomscrolling in bed. Worth every penny.",
  },
  {
    name: "Jordan K.",
    rating: 4,
    title: "Simple and effective",
    body: "Setup took two minutes. The friction of having to walk to the card is exactly what I needed. Would love a few more customization options but it does the job.",
  },
  {
    name: "Elena R.",
    rating: 5,
    title: "Better than any subscription app",
    body: "Paid once, no monthly fee, no account, no nonsense. I block TikTok and Twitter during work hours and my focus has genuinely improved.",
  },
  {
    name: "Sam W.",
    rating: 5,
    title: "The physical card is the trick",
    body: "Software-only blockers never worked because I'd just disable them. With Detach you have to physically find the card. Game changer.",
  },
  {
    name: "Aisha N.",
    rating: 5,
    title: "Recommended to my whole family",
    body: "My teenager actually uses it without complaining. The tap-to-end ritual feels less like punishment and more like a habit.",
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-16 px-6 border-t border-border/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Loved by <span className="text-gradient">thousands</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-base">
            4.8 out of 5 from real customers on the App Store.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, idx) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h3 className="font-semibold text-base mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{r.body}</p>
              <p className="text-xs text-muted-foreground/70 font-medium">{r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
