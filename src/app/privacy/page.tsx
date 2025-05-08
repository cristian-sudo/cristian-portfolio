"use client";

import { useLanguage } from '../context/LanguageContext';

const privacyContent = {
  EN: {
    title: "Privacy Policy",
    sections: {
      information: {
        title: "1. Information We Collect",
        description: "We collect information that you provide directly to us through our contact form, including:",
        items: [
          "Name",
          "Email address",
          "Message content",
          "Company name (for recruiter inquiries)",
          "Salary information (for recruiter inquiries)",
          "Technical stack details (for recruiter inquiries)",
          "Location information (for non-remote positions)",
          "Project description (for freelance inquiries)",
          "Budget information (for freelance inquiries)",
          "Time constraints (for freelance inquiries)"
        ]
      },
      usage: {
        title: "2. How We Use Your Information",
        description: "We use the information we collect to:",
        items: [
          "Respond to your inquiries and messages",
          "Process job opportunities and freelance project requests",
          "Communicate with you about potential opportunities",
          "Improve our services and user experience"
        ]
      },
      processing: {
        title: "3. Data Processing and Storage",
        description: "Your information is processed and stored securely through our form submission service provider, Web3Forms. You can review their privacy policy at"
      },
      rights: {
        title: "4. Your Rights Under GDPR",
        description: "Under the General Data Protection Regulation (GDPR), you have the following rights:",
        items: [
          "Right to access your personal data",
          "Right to rectification of inaccurate data",
          "Right to erasure (&quot;right to be forgotten&quot;)",
          "Right to restrict processing",
          "Right to data portability",
          "Right to object to processing",
          "Right to withdraw consent"
        ]
      },
      retention: {
        title: "5. Data Retention",
        description: "We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements. Typically, this means we will keep your data for up to 12 months after our last interaction with you."
      },
      contact: {
        title: "6. Contact Us",
        description: "If you have any questions about this Privacy Policy or our data practices, please contact us through our contact form."
      },
      changes: {
        title: "7. Changes to This Policy",
        description: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date."
      }
    }
  },
  RO: {
    title: "Politica de Confidențialitate",
    sections: {
      information: {
        title: "1. Informațiile pe care le colectăm",
        description: "Colectăm informații pe care ni le furnizați direct prin formularul nostru de contact, inclusiv:",
        items: [
          "Nume",
          "Adresă de email",
          "Conținutul mesajului",
          "Numele companiei (pentru solicitări de la recruiteri)",
          "Informații despre salariu (pentru solicitări de la recruiteri)",
          "Detalii despre stack-ul tehnic (pentru solicitări de la recruiteri)",
          "Informații despre locație (pentru poziții non-remote)",
          "Descrierea proiectului (pentru solicitări freelance)",
          "Informații despre buget (pentru solicitări freelance)",
          "Constrângeri de timp (pentru solicitări freelance)"
        ]
      },
      usage: {
        title: "2. Cum folosim informațiile dvs",
        description: "Folosim informațiile pe care le colectăm pentru a:",
        items: [
          "Răspunde la întrebările și mesajele dvs",
          "Procesa oportunități de muncă și solicitări de proiecte freelance",
          "Comunica cu dvs despre oportunități potențiale",
          "Îmbunătăți serviciile și experiența utilizatorului"
        ]
      },
      processing: {
        title: "3. Procesarea și stocarea datelor",
        description: "Informațiile dvs sunt procesate și stocate în siguranță prin furnizorul nostru de servicii de trimitere a formularelor, Web3Forms. Puteți consulta politica lor de confidențialitate la"
      },
      rights: {
        title: "4. Drepturile dvs conform GDPR",
        description: "Conform Regulamentului General privind Protecția Datelor (GDPR), aveți următoarele drepturi:",
        items: [
          "Dreptul de a accesa datele dvs personale",
          "Dreptul la rectificarea datelor inexacte",
          "Dreptul la ștergere (&quot;dreptul de a fi uitat&quot;)",
          "Dreptul la restricționarea procesării",
          "Dreptul la portabilitatea datelor",
          "Dreptul de a vă opune procesării",
          "Dreptul de a retrage consimțământul"
        ]
      },
      retention: {
        title: "5. Păstrarea datelor",
        description: "Păstrăm informațiile dvs personale doar atât timp cât este necesar pentru a îndeplini scopurile pentru care au fost colectate, inclusiv cerințele legale, contabile sau de raportare. De obicei, acest lucru înseamnă că vom păstra datele dvs până la 12 luni după ultima interacțiune cu dvs."
      },
      contact: {
        title: "6. Contactați-ne",
        description: "Dacă aveți întrebări despre această Politică de Confidențialitate sau despre practicile noastre privind datele, vă rugăm să ne contactați prin formularul nostru de contact."
      },
      changes: {
        title: "7. Modificări ale acestei politici",
        description: "Putem actualiza această Politică de Confidențialitate din când în când. Vă vom notifica despre orice modificări prin publicarea noii Politici de Confidențialitate pe această pagină și actualizarea datei &quot;Ultima actualizare&quot;."
      }
    }
  },
  IT: {
    title: "Informativa sulla Privacy",
    sections: {
      information: {
        title: "1. Informazioni che raccogliamo",
        description: "Raccogliamo informazioni che ci fornisci direttamente tramite il nostro modulo di contatto, inclusi:",
        items: [
          "Nome",
          "Indirizzo email",
          "Contenuto del messaggio",
          "Nome dell'azienda (per richieste dei recruiter)",
          "Informazioni sullo stipendio (per richieste dei recruiter)",
          "Dettagli dello stack tecnico (per richieste dei recruiter)",
          "Informazioni sulla località (per posizioni non remote)",
          "Descrizione del progetto (per richieste freelance)",
          "Informazioni sul budget (per richieste freelance)",
          "Vincoli temporali (per richieste freelance)"
        ]
      },
      usage: {
        title: "2. Come utilizziamo le tue informazioni",
        description: "Utilizziamo le informazioni che raccogliamo per:",
        items: [
          "Rispondere alle tue richieste e messaggi",
          "Elaborare opportunità di lavoro e richieste di progetti freelance",
          "Comunicare con te su potenziali opportunità",
          "Migliorare i nostri servizi e l'esperienza utente"
        ]
      },
      processing: {
        title: "3. Elaborazione e archiviazione dei dati",
        description: "Le tue informazioni vengono elaborate e archiviate in modo sicuro tramite il nostro fornitore di servizi di invio moduli, Web3Forms. Puoi consultare la loro informativa sulla privacy su"
      },
      rights: {
        title: "4. I tuoi diritti ai sensi del GDPR",
        description: "Ai sensi del Regolamento Generale sulla Protezione dei Dati (GDPR), hai i seguenti diritti:",
        items: [
          "Diritto di accesso ai tuoi dati personali",
          "Diritto di rettifica dei dati inesatti",
          "Diritto alla cancellazione (&quot;diritto all'oblio&quot;)",
          "Diritto alla limitazione del trattamento",
          "Diritto alla portabilità dei dati",
          "Diritto di opposizione al trattamento",
          "Diritto di revocare il consenso"
        ]
      },
      retention: {
        title: "5. Conservazione dei dati",
        description: "Conserviamo le tue informazioni personali solo per il tempo necessario a soddisfare gli scopi per cui sono state raccolte, inclusi requisiti legali, contabili o di rendicontazione. In genere, ciò significa che conserveremo i tuoi dati fino a 12 mesi dopo la nostra ultima interazione con te."
      },
      contact: {
        title: "6. Contattaci",
        description: "Se hai domande su questa Informativa sulla Privacy o sulle nostre pratiche sui dati, ti preghiamo di contattarci tramite il nostro modulo di contatto."
      },
      changes: {
        title: "7. Modifiche a questa informativa",
        description: "Potremmo aggiornare questa Informativa sulla Privacy di volta in volta. Ti informeremo di eventuali modifiche pubblicando la nuova Informativa sulla Privacy su questa pagina e aggiornando la data dell'&quot;Ultimo aggiornamento&quot;."
      }
    }
  },
  RU: {
    title: "Политика конфиденциальности",
    sections: {
      information: {
        title: "1. Информация, которую мы собираем",
        description: "Мы собираем информацию, которую вы предоставляете нам через нашу контактную форму, включая:",
        items: [
          "Имя",
          "Адрес электронной почты",
          "Содержание сообщения",
          "Название компании (для запросов от рекрутеров)",
          "Информация о зарплате (для запросов от рекрутеров)",
          "Детали технического стека (для запросов от рекрутеров)",
          "Информация о местоположении (для не-удаленных позиций)",
          "Описание проекта (для фриланс-запросов)",
          "Информация о бюджете (для фриланс-запросов)",
          "Временные ограничения (для фриланс-запросов)"
        ]
      },
      usage: {
        title: "2. Как мы используем вашу информацию",
        description: "Мы используем собранную информацию для:",
        items: [
          "Ответа на ваши запросы и сообщения",
          "Обработки возможностей трудоустройства и запросов на фриланс-проекты",
          "Связи с вами по поводу потенциальных возможностей",
          "Улучшения наших услуг и пользовательского опыта"
        ]
      },
      processing: {
        title: "3. Обработка и хранение данных",
        description: "Ваша информация обрабатывается и хранится безопасно через нашего провайдера услуг отправки форм, Web3Forms. Вы можете ознакомиться с их политикой конфиденциальности на"
      },
      rights: {
        title: "4. Ваши права согласно GDPR",
        description: "В соответствии с Общим регламентом по защите данных (GDPR), у вас есть следующие права:",
        items: [
          "Право на доступ к вашим персональным данным",
          "Право на исправление неточных данных",
          "Право на удаление (&quot;право на забвение&quot;)",
          "Право на ограничение обработки",
          "Право на переносимость данных",
          "Право на возражение против обработки",
          "Право на отзыв согласия"
        ]
      },
      retention: {
        title: "5. Хранение данных",
        description: "Мы храним вашу персональную информацию только столько времени, сколько необходимо для выполнения целей, для которых она была собрана, включая юридические, бухгалтерские или отчетные требования. Обычно это означает, что мы будем хранить ваши данные до 12 месяцев после нашего последнего взаимодействия с вами."
      },
      contact: {
        title: "6. Свяжитесь с нами",
        description: "Если у вас есть вопросы об этой Политике конфиденциальности или о наших практиках работы с данными, пожалуйста, свяжитесь с нами через нашу контактную форму."
      },
      changes: {
        title: "7. Изменения в этой политике",
        description: "Мы можем время от времени обновлять эту Политику конфиденциальности. Мы будем уведомлять вас о любых изменениях, публикуя новую Политику конфиденциальности на этой странице и обновляя дату &quot;Последнего обновления&quot;."
      }
    }
  }
};

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const content = privacyContent[language as keyof typeof privacyContent];
  
  // Use a consistent date format
  const lastUpdated = "May 8, 2024";

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">{content.title}</h1>
      
      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold mb-4">{content.sections.information.title}</h2>
          <p className="mb-4">{content.sections.information.description}</p>
          <ul className="list-disc pl-6 mb-4">
            {content.sections.information.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{content.sections.usage.title}</h2>
          <p className="mb-4">{content.sections.usage.description}</p>
          <ul className="list-disc pl-6 mb-4">
            {content.sections.usage.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{content.sections.processing.title}</h2>
          <p className="mb-4">
            {content.sections.processing.description}{' '}
            <a href="https://web3forms.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              https://web3forms.com/privacy
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{content.sections.rights.title}</h2>
          <p className="mb-4">{content.sections.rights.description}</p>
          <ul className="list-disc pl-6 mb-4">
            {content.sections.rights.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{content.sections.retention.title}</h2>
          <p className="mb-4">{content.sections.retention.description}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{content.sections.contact.title}</h2>
          <p className="mb-4">{content.sections.contact.description}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{content.sections.changes.title}</h2>
          <p className="mb-4">{content.sections.changes.description}</p>
          <p className="text-sm text-gray-400">
            Last Updated: {lastUpdated}
          </p>
        </section>
      </div>
    </div>
  );
} 