import Footer from '@/components/Footer'

export default function Privatliv() {
  return (
    <>
    <div className="min-h-screen bg-stone-950 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-amber-500 mb-8">Privatlivspolitik</h1>
        <div className="bg-stone-900 rounded-xl p-8 space-y-6 text-stone-300 leading-relaxed">
          <p>Når du bruger vores app til bestilling indsamler vi de informationer der er nødvendige for at kunne behandle din bestilling. Vi indsamler følgende oplysninger om dig:</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-700">
                  <th className="py-2 pr-4 text-white font-semibold"></th>
                  <th className="py-2 pr-4 text-white font-semibold">Påkrævet</th>
                  <th className="py-2 pr-4 text-white font-semibold">Formål</th>
                  <th className="py-2 text-white font-semibold">Deles med</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Navn', 'Ja', 'App-funktionalitet', 'Den restaurant du bestiller hos'],
                  ['Adresse', 'Nej', 'App-funktionalitet', 'Den restaurant du bestiller hos'],
                  ['E-mail', 'Ja', 'App-funktionalitet', 'Den restaurant du bestiller hos'],
                  ['Mobilnummer', 'Ja', 'App-funktionalitet', 'Den restaurant du bestiller hos'],
                ].map(([field, required, purpose, shared]) => (
                  <tr key={field} className="border-b border-stone-800">
                    <td className="py-2 pr-4 text-white font-medium">{field}</td>
                    <td className="py-2 pr-4">{required}</td>
                    <td className="py-2 pr-4">{purpose}</td>
                    <td className="py-2">{shared}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>Adresse er ikke nødvendig, hvis du selv henter din bestilling.</p>
          <p>Dine informationer gemmes på vores servere og videregives kun til den restaurant, hvor du har valgt at bestille din mad. Alle data krypteres under overførsel til vores servere.</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Sletning af konto</h2>
            <p>Log ind via <a href="https://sunu.dk/slet" className="text-amber-500 hover:underline">https://sunu.dk/slet</a> for at slette din konto.</p>
            <p className="mt-2">Du kan også kontakte os på <a href="mailto:info@sunu.dk" className="text-amber-500 hover:underline">info@sunu.dk</a> for anmodning om sletning af dine data og konto.</p>
            <p className="mt-2">Regnskabsrelevante data gemmes jf. bogføringsloven og kan derfor ikke slettes.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Support og spørgsmål</h2>
            <p>Har du spørgsmål til privatliv eller sletning af konto, kan du kontakte:</p>
            <div className="mt-2 text-stone-400">
              <p>Sunu, v/ Softhouse</p>
              <p>Christiansvej 21</p>
              <p>7000 Fredericia</p>
              <p>CVR 25292189</p>
              <p><a href="mailto:info@sunu.dk" className="text-amber-500 hover:underline">info@sunu.dk</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Udvikler</h2>
            <p>Har du tekniske problemer med appen kan du kontakte:</p>
            <div className="mt-2 text-stone-400">
              <p>Stadel.dk ApS</p>
              <p>Toldboden 3</p>
              <p>8800 Viborg</p>
              <p>Tlf. 89939900</p>
              <p><a href="mailto:support@stadel.dk" className="text-amber-500 hover:underline">support@stadel.dk</a></p>
              <p>CVR 36938447</p>
            </div>
          </section>

          <p className="text-stone-500 text-sm pt-4 border-t border-stone-800">Sidst opdateret: 13-11-2024</p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}
