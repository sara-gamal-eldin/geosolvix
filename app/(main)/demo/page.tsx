import { Mail } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="py-20 bg-[#faf9ff] min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4">
        <div className="bg-white p-8 rounded-2xl border border-[#EAECF0] shadow-xl shadow-black/5 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5 text-center border-b border-[#EAECF0] pb-6">
            <span className="text-xs font-extrabold text-[#006ff0] uppercase tracking-wider">
              Governmental cooperative & enterprise proposals
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#001a43] tracking-tight">
              Request an Official Demonstration
            </h1>
            <p className="text-xs text-[#475467] max-w-md mx-auto mt-2 leading-relaxed text-center">
              Authorized regional agencies, municipal land registries, and enterprise clients can request a dedicated sandbox instance, custom workshop, or deployment consult. Contact our technical team directly at support@geosolvix.com or synthesize an onboarding trial plan below.
            </p>
          </div>
          <div className="p-4 bg-[#001a43]/5 border border-[#006ff0]/20 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 text-left shadow-sm">
            <div className="flex-1">
              <h4 className="text-xs font-bold text-[#001a43] uppercase tracking-wider">
                Direct Institutional Requisition
              </h4>
              <p className="text-[11px] text-[#475467] mt-1 leading-relaxed">
                To initiate official administrative procurement evaluations, custom tool reviews, or database sandboxes, click below to email our municipal dispatch team.
              </p>
            </div>
            <a
              href="mailto:support@geosolvix.com?subject=Geosolvix%20Demo%20Requisition&body=Hello%20Geosolvix%20Team%2C%0A%0AWe%20are%20interested%20in%20arranging%20an%20official%20demonstration%20of%20your%20geospatial%20tools%20and%20products.%20%0A%0AOrganization%3A%20%5BName%5D%0ALocation%3A%20%5BState%2FCountry%5D%0ATarget%20Objective%3A%20%5BSubdivision%20%2F%20Facility%20Registry%20%20%2F%20Zoning%20%2F%20Basemap%20%5D%0A%0ABest%20regards%2C"
              className="px-4 py-2.5 bg-[#001a43] hover:bg-[#003380] text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-sm shadow-[#001a43]/15"
            >
              <Mail className="w-4 h-4 text-[#aec6ff]" />
              Email support@geosolvix.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
