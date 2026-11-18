export type LegalTopic = 'aviso' | 'privacidad' | 'cookies';

export default function LegalContent({ type }: { type: LegalTopic }) {
  if (type === 'aviso') {
    return (
      <div className="space-y-5 text-[13px] leading-6 text-slate-700">
        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">1. Titular del sitio web</h3>
          <p className="mt-2">
            En cumplimiento de la normativa aplicable en materia de servicios de la sociedad de
            la información, se informa de que el titular del sitio web https://coforma.es y de la
            marca comercial Coforma es:
          </p>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p><strong>Titular:</strong> Antonio Manuel Barragán Cabrera</p>
            <p><strong>NIF:</strong> 42884234K</p>
            <p><strong>Domicilio profesional:</strong> Avda. El Mirón, nº22 1º C, 35400 Arucas, Las Palmas, España</p>
            <p><strong>Correo electrónico:</strong> admin@coforma.es</p>
            <p><strong>Teléfono:</strong> +34 649 220 045</p>
            <p><strong>Nombre comercial:</strong> Coforma</p>
          </div>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">2. Actividad</h3>
          <p className="mt-2">
            Coforma ofrece servicios vinculados a la gestión de bases de datos, organización
            operativa y CRM integral en el ámbito de la Formación Profesional para el Empleo,
            orientado a academias, entidades de formación y estructuras vinculadas a la gestión
            formativa.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">3. Condiciones de uso</h3>
          <p className="mt-2">
            El acceso y uso de este sitio web atribuye la condición de usuario e implica la
            aceptación de este aviso legal. El usuario se compromete a utilizar la web, sus
            contenidos y servicios de forma lícita, diligente y conforme a la buena fe, absteniéndose
            de realizar cualquier actuación que pueda dañar, inutilizar, sobrecargar o deteriorar
            el sitio web o impedir su normal utilización.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">4. Propiedad intelectual e industrial</h3>
          <p className="mt-2">
            Los contenidos de este sitio web, incluyendo textos, estructura, diseño, elementos
            visuales, denominación comercial, imágenes, logotipos y materiales relacionados con
            Coforma, son titularidad de su responsable o se utilizan con autorización o licencia
            suficiente. Queda prohibida su reproducción, distribución, comunicación pública o
            transformación sin autorización expresa, salvo en los casos legalmente permitidos.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">5. Responsabilidad</h3>
          <p className="mt-2">
            El titular procura que la información disponible en la web sea clara, actualizada y
            correcta. No obstante, no se garantiza la inexistencia de errores puntuales, interrupciones
            técnicas o falta de disponibilidad temporal del sitio. Coforma no se hace responsable
            del uso indebido que los usuarios puedan realizar de los contenidos publicados.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">6. Enlaces externos</h3>
          <p className="mt-2">
            Este sitio puede incluir enlaces a sitios web de terceros. Coforma no controla ni asume
            responsabilidad sobre el contenido, políticas o prácticas de dichos sitios externos,
            correspondiendo al usuario revisar sus condiciones propias.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">7. Legislación aplicable</h3>
          <p className="mt-2">
            Este aviso legal se rige por la legislación española. Para cualquier controversia que
            pudiera derivarse del acceso o uso del sitio web, las partes se someterán a los juzgados
            y tribunales que resulten competentes conforme a la normativa aplicable.
          </p>
        </section>
      </div>
    );
  }

  if (type === 'privacidad') {
    return (
      <div className="space-y-5 text-[13px] leading-6 text-slate-700">
        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">1. Responsable del tratamiento</h3>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p><strong>Responsable:</strong> Antonio Manuel Barragán Cabrera</p>
            <p><strong>NIF:</strong> 42884234K</p>
            <p><strong>Domicilio:</strong> Avda. El Mirón, nº22 1º C, 35400 Arucas, Las Palmas, España</p>
            <p><strong>Email de contacto y derechos:</strong> admin@coforma.es</p>
            <p><strong>Marca comercial:</strong> Coforma</p>
          </div>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">2. Datos personales tratados</h3>
          <p className="mt-2">
            A través del formulario de solicitud de demo o contacto, Coforma puede tratar los
            siguientes datos: empresa, nombre, teléfono, dirección de correo electrónico y
            observaciones facilitadas voluntariamente por el usuario.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">3. Finalidades del tratamiento</h3>
          <p className="mt-2">Los datos se tratarán para las siguientes finalidades:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Atender solicitudes de información recibidas a través de la web.</li>
            <li>Contactar con la persona interesada para concertar o ampliar información sobre una demo.</li>
            <li>Gestionar comunicaciones precontractuales o comerciales solicitadas por el usuario.</li>
            <li>Responder consultas relacionadas con Coforma y sus servicios.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">4. Legitimación</h3>
          <p className="mt-2">
            La base jurídica para el tratamiento de los datos es el consentimiento del usuario al
            enviar el formulario y el interés precontractual o comercial derivado de la solicitud
            realizada. El usuario puede retirar su consentimiento en cualquier momento escribiendo
            a admin@coforma.es.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">5. Destinatarios y proveedores</h3>
          <p className="mt-2">
            Los datos no se cederán a terceros salvo obligación legal. Las solicitudes enviadas
            desde la web se reciben por correo electrónico y pueden ser gestionadas mediante
            servicios de correo como Outlook/Microsoft para responder a la persona interesada.
          </p>
          <p className="mt-2">
            La web y la aplicación asociada pueden apoyarse en proveedores tecnológicos necesarios
            para su funcionamiento, alojamiento, despliegue o mantenimiento técnico.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">6. Conservación</h3>
          <p className="mt-2">
            Los datos se conservarán durante el tiempo necesario para atender la solicitud,
            mantener la relación precontractual o comercial derivada de la misma y, posteriormente,
            durante los plazos necesarios para atender posibles responsabilidades legales.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">7. Derechos de las personas interesadas</h3>
          <p className="mt-2">
            Las personas interesadas pueden ejercer sus derechos de acceso, rectificación,
            supresión, oposición, limitación del tratamiento y portabilidad, cuando proceda,
            escribiendo a admin@coforma.es e indicando el derecho que desean ejercer.
          </p>
          <p className="mt-2">
            También podrán presentar una reclamación ante la Agencia Española de Protección de
            Datos si consideran que el tratamiento de sus datos no se ajusta a la normativa vigente.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">8. Seguridad</h3>
          <p className="mt-2">
            Coforma aplicará medidas técnicas y organizativas razonables para proteger los datos
            personales frente a pérdida, uso indebido, acceso no autorizado o divulgación indebida,
            teniendo en cuenta la naturaleza de los datos tratados y el contexto del tratamiento.
          </p>
        </section>
      </div>
    );
  }

  if (type === 'cookies') {
    return (
      <div className="space-y-5 text-[13px] leading-6 text-slate-700">
        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">1. Qué son las cookies</h3>
          <p className="mt-2">
            Las cookies son pequeños archivos que se almacenan en el dispositivo del usuario
            cuando visita un sitio web. Pueden utilizarse para permitir el funcionamiento técnico
            de la página, recordar preferencias o medir el uso del sitio, entre otras finalidades.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">2. Cookies utilizadas en Coforma</h3>
          <p className="mt-2">
            En esta fase, coforma.es utiliza una preferencia local necesaria para recordar la
            decisión del usuario sobre cookies. Esta preferencia evita mostrar de nuevo el aviso
            una vez que el usuario ha aceptado, rechazado o configurado su elección.
          </p>
          <p className="mt-2">
            La web puede incorporar próximamente herramientas de medición como Google Analytics
            y Vercel Analytics. En caso de activarse cookies o tecnologías analíticas sujetas a
            consentimiento, solo se utilizarán cuando el usuario haya aceptado o configurado
            favorablemente dicha categoría.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">3. Tipos de cookies o tecnologías previstas</h3>
          <div className="mt-3 space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-extrabold text-slate-950">Técnicas o necesarias</p>
              <p className="mt-1">
                Permiten el funcionamiento básico de la web y recordar la preferencia del usuario
                sobre cookies. No requieren consentimiento cuando son estrictamente necesarias.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-extrabold text-slate-950">Analíticas o de medición</p>
              <p className="mt-1">
                Permiten conocer de forma agregada cómo se utiliza la web para mejorar su contenido,
                rendimiento y experiencia de usuario. Podrán incluir herramientas como Google
                Analytics o Vercel Analytics si se activan posteriormente.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">4. Cómo gestionar las cookies</h3>
          <p className="mt-2">
            El usuario puede aceptar, rechazar o configurar las cookies desde el banner inicial.
            También puede borrar o bloquear cookies desde la configuración de su navegador.
          </p>
          <p className="mt-2">
            Si el usuario rechaza las cookies analíticas, la web seguirá funcionando con normalidad,
            aunque no se utilizarán mediciones no necesarias sujetas a consentimiento.
          </p>
        </section>

        <section>
          <h3 className="text-[15px] font-extrabold text-slate-950">5. Responsable</h3>
          <p className="mt-2">
            El responsable del sitio web es Antonio Manuel Barragán Cabrera, titular de la marca
            comercial Coforma. Para cualquier cuestión relacionada con esta política puede escribir
            a admin@coforma.es.
          </p>
        </section>
      </div>
    );
  }

  return null;
}
