import { Instagram, Github, Twitter, Mail, Palette } from "lucide-react";
import { useStore } from "../../store/useStore";

export default function PrivacyPolicy() {
  const { setView } = useStore();

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 md:px-0">
      <h1
        className="text-[36px] mb-2 text-zinc-900"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        <em className="not-italic italic">Privacy policy</em>
      </h1>
      <p className="text-zinc-400 text-[13px] mb-10">
        Last updated August 2026
      </p>

      <div className="space-y-7 text-[14.5px] leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-[13px] font-semibold tracking-[0.02em] text-zinc-900 mb-2 uppercase">
            What we store
          </h2>
          <p>
            palettesnap does not require an account, so we don't collect names,
            emails, or passwords. When you like a palette, a random identifier
            is generated and stored in your browser's local storage. That
            identifier is sent to our database so your likes and collection
            persist across visits on the same browser. It isn't linked to any
            personal information and we have no way of connecting it back to
            you.
          </p>
          <p className="mt-4">
            To keep the free database healthy, publishing is limited to 20
            palettes per week per browser (resets Monday 00:00 UTC). Enforcing
            that limit requires a fingerprint of your browser - a hash built
            from technical details like your canvas rendering, WebGL graphics
            card string, screen size, language, and time zone (never cookies,
            and never anything that identifies you personally). The hash is
            stored alongside the palettes you publish and is only used to
            count this week's publishes. Incognito windows on the same
            computer share this hash, so opening a private window does not
            reset the limit.
          </p>
        </section>

        <section>
          <h2 className="text-[13px] font-semibold tracking-[0.02em] text-zinc-900 mb-2 uppercase">
            Palettes you publish
          </h2>
          <p>
            Any palette you create, including its colors and tags, is stored
            permanently and shown publicly to all visitors. Don't include
            anything in a tag or palette you wouldn't want public - there's
            currently no way to delete a published palette yourself.
          </p>
        </section>

        <section>
          <h2 className="text-[13px] font-semibold tracking-[0.02em] text-zinc-900 mb-2 uppercase">
            Third parties
          </h2>
          <p>
            Palette and like data is hosted on Supabase. We don't sell data, run
            ads, or share anything with advertising or analytics networks.
          </p>
        </section>

        <section>
          <h2 className="text-[13px] font-semibold tracking-[0.02em] text-zinc-900 mb-2 uppercase">
            Clearing your data
          </h2>
          <p>
            Clearing your browser's site data for palettesnap removes your local
            device identifier. Your future likes will start fresh, and any
            palettes you'd previously liked will no longer show as liked in your
            collection.
          </p>
        </section>

        <section>
          <h2 className="text-[13px] font-semibold tracking-[0.02em] text-zinc-900 mb-2 uppercase">
            Contact
          </h2>
          <p>
            Questions about this policy can be sent through the links below.
          </p>
        </section>

        {/* CONNECT SECTION */}
        <section className="pt-4 border-t border-zinc-200">
          <h2 className="text-[13px] font-semibold tracking-[0.02em] text-zinc-900 mb-4 uppercase">
            Connect
          </h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.instagram.com/bilalmlkdev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-full text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
            >
              <Instagram size={15} />
              Instagram
            </a>
            <a
              href="https://github.com/bilalmlkdev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-full text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
            >
              <Github size={15} />
              GitHub
            </a>
            <a
              href="https://twitter.com/bilalmlkdev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-full text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
            >
              <Twitter size={15} />
              Twitter / X
            </a>
            <a
              href="mailto:bilalmlkdev@email.com"
              className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-full text-[13px] font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
            >
              <Mail size={15} />
              Email
            </a>

            {/* GO BACK TO APP LINK */}
            <button
              onClick={() => setView("new")}
              className="flex items-center gap-2 px-4 py-2 border border-zinc-900 rounded-full text-[13px] font-medium text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors"
            >
              <Palette size={15} />
              Explore the app
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
