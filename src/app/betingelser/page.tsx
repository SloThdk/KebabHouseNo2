import Footer from '@/components/Footer'
import { VisaLogo, VisaElectronLogo, MastercardLogo } from '@/components/PaymentLogos'

export default function Betingelser() {
  return (
    <>
    <div className="min-h-screen bg-stone-950 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-amber-500 mb-8">Handelsbetingelser</h1>
        <div className="bg-stone-900 rounded-xl p-8 space-y-6 text-stone-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Levering</h2>
            <p>Ved kortbetaling vil beløbet først blive trukket fra dit kort tidligst 24 timer efter bestillingen er afgivet, så restauranten har mulighed for at annullere betalingen, såfremt en bestilling ikke kan afhentes eller udbringes.</p>
            <p className="mt-3">Der vil aldrig blive trukket et højere beløb end det du har godkendt ved betalingen.</p>
            <p className="mt-3">Vi gør opmærksom på at afgivelse af en bestilling via denne side er en juridisk aftale mellem dig og den angivne restaurant, og at Sunu udelukkende håndterer og videreleverer information om din bestilling til den angivne restaurant.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Garanti</h2>
            <p>Bestillinger afgivet af dig til Sunu.dk, er underlagt almindelig dansk lovgivning.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Fortrydelsesret</h2>
            <p>Der ydes ikke fortrydelsesret på køb, da alle varer er fødevarer.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Reklamation</h2>
            <p>Ved reklamation skal der altid tages kontakt til den pågældende restaurant. Herefter kan der tages kontakt til SUNU, hvis ikke reklamationen kan færdiggøres mellem kunde og restaurant.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Behandling af oplysninger</h2>
            <p>Vi registerer de informationer der er nødvendige for at kunne yde dig den bedste service. Vi gemmer en cookie på din computer. Denne cookie benyttes til at kunne identificere dig på hjemmesiden. Cookien indeholder ingen personfølsomme oplysninger. Vi videregiver ikke dine informationer til 3.-part ud over det eller de restauranter du handler med på hjemmesiden.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Misbrug</h2>
            <p>Misbrug af denne side vil medføre politianmeldelse. Alle IP adresser bliver gemt i vores system til evt. efterforskning.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Betaling</h2>
            <p>Alle priser er angivet i DKK inkl. moms. Ved betaling med betalingskort vil der på din konto stå: &quot;Sunu.dk (Mad online)&quot;.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Kortbetaling</h2>
            <p>Vi tager imod VISA-dankort, VISA-electron, VISA samt Masterkort.</p>
          </section>

          <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
            <p className="text-stone-500 text-sm">© Sunu.dk - Christiansvej 21 - 7000 Fredericia - Cvr.: 25292189</p>
            <div className="flex items-center gap-3">
              <VisaLogo />
              <VisaElectronLogo />
              <MastercardLogo />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}
