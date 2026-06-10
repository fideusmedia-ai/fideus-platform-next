import Script from "next/script";

/**
 * Microsoft Clarity — heatmaps + session recordings gratis.
 *
 * Setup:
 * 1. Crear cuenta en https://clarity.microsoft.com
 * 2. Crear un proyecto y copiar el Project ID
 * 3. Agregar a .env.local:  NEXT_PUBLIC_CLARITY_ID=tu-project-id
 *
 * Si NEXT_PUBLIC_CLARITY_ID no está set, el componente no renderiza
 * nada (graceful no-op para dev local).
 */
export default function MicrosoftClarity() {
  const id = process.env.NEXT_PUBLIC_CLARITY_ID;
  if (!id) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${id}");
      `}
    </Script>
  );
}
