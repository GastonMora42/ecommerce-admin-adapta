// pages/privacy.js
import React from 'react';
import Head from 'next/head';
import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
    <div>
      <Head>
        <title>Política de Privacidad</title>
      </Head>
      <h1>Política de Privacidad</h1>
      <p>Última actualización: [Fecha]</p>
      
      <p>
        En [Nombre de la Empresa], respetamos su privacidad y estamos comprometidos a proteger la información personal que comparte con nosotros. Esta Política de Privacidad explica cómo recopilamos, usamos, almacenamos y compartimos la información de los usuarios de Google a través de nuestra aplicación.
      </p>

      <h2>1. Información que Recopilamos</h2>
      <p>
        Podemos recopilar y almacenar la siguiente información personal cuando utiliza nuestra aplicación:
        <ul>
          <li>Información de perfil de Google, incluyendo su nombre, dirección de correo electrónico y foto de perfil.</li>
          <li>Datos de autenticación para verificar su identidad y acceder a su cuenta.</li>
        </ul>
      </p>

      <h2>2. Cómo Usamos su Información</h2>
      <p>
        Utilizamos la información recopilada para los siguientes propósitos:
        <ul>
          <li>Proporcionar y mejorar nuestros servicios.</li>
          <li>Autenticar usuarios y permitir el acceso seguro a sus cuentas.</li>
          <li>Personalizar la experiencia del usuario.</li>
          <li>Enviar comunicaciones relacionadas con nuestros servicios.</li>
        </ul>
      </p>

      <h2>3. Compartir su Información</h2>
      <p>
        No compartimos su información personal con terceros, excepto en las siguientes circunstancias:
        <ul>
          <li>Con su consentimiento explícito.</li>
          <li>Cuando sea necesario para cumplir con leyes aplicables o responder a procesos legales.</li>
          <li>Para proteger nuestros derechos, propiedad y seguridad, así como los de nuestros usuarios y el público.</li>
        </ul>
      </p>

      <h2>4. Almacenamiento y Seguridad de los Datos</h2>
      <p>
        Tomamos medidas razonables para proteger la información personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción. Sin embargo, no podemos garantizar la seguridad absoluta de la información transmitida a través de internet.
      </p>

      <h2>5. Sus Derechos de Privacidad</h2>
      <p>
        Usted tiene derecho a acceder, corregir y eliminar su información personal que recopilamos. Puede ejercer estos derechos contactándonos en [Correo Electrónico de Contacto].
      </p>

      <h2>6. Cambios a esta Política de Privacidad</h2>
      <p>
        Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Le notificaremos sobre cualquier cambio publicando la nueva Política de Privacidad en nuestro sitio web. Le recomendamos revisar esta página periódicamente para estar al tanto de cualquier cambio.
      </p>

      <h2>7. Contacto</h2>
      <p>
        Si tiene alguna pregunta o inquietud acerca de esta Política de Privacidad, no dude en contactarnos en [Correo Electrónico de Contacto].
      </p>
    </div>
    </Layout>
  );
};

export default PrivacyPolicy;
