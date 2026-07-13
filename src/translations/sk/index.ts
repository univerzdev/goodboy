const sk = {
  app: {
    title: "Good Boy",
    description: "Zlepšovanie života psov v Žiline",
  },
  footer: {
    contact: "Kontakt",
    about: "O projekte",
    logoAlt: "Good Boy Logo",
  },
  pages: {
    contact: {
      title: "Kontakt",
      cards: {
        email: {
          title: "Email",
          description: "Our friendly team is here to help.",
          value: "hello@goodrequest.com",
        },
        office: {
          title: "Office",
          description: "Come say hello at our office HQ.",
          value: "Obchodná 3D, 010 08 Žilina, Slovakia",
          link: "https://maps.google.com/?q=Obchodna+3D+010+08+Zilina+Slovakia",
        },
        phone: {
          title: "Phone",
          description: "Mon-Fri from 8am to 5pm.",
          value: "+421 911 750 750",
          linkValue: "+421911750750",
        },
      },
    },
    about: {
      title: "O projekte",
      lead: "Nadácia Good Boy sa venuje zlepšovaniu života psov v Žiline na Slovensku. Zachraňujeme opustené, týrané a bezdomovské psy, poskytujeme im lekársku starostlivosť, útočisko a lásku, ktorú si zaslúžia. Našim poslaním je dať týmto verným spoločníkom druhú šancu na život tým, že im nájdeme milujúci domov. Okrem záchrany a rehabilitácie sa zameriavame aj na podporu zodpovedného vlastníctva zvierat a ochrany zvierat prostredníctvom vzdelávacích a komunitných programov.",
      stats: {
        amount: {
          value: "12 200 €",
          label: "Celková vyzbieraná hodnota",
        },
        donors: {
          value: "1 028",
          label: "Počet darcov",
        },
      },
      body: "Naša práca je možná vďaka podpore vášnivých dobrovoľníkov, štedrých darcov a komunity, ktorá sa hlboko stará o dobro zvierat. Organizujeme aj kastračné a sterilizačné iniciatívy, aby sme riešili problém túlavých psov a zabezpečili dlhodobý vplyv. V nadácii Good Boy veríme, že každý pes si zaslúži bezpečný, milujúci domov a šťastný život. Pridajte sa k nám a pomôžte nám robiť zmeny - či už dobrovoľníctvom, darovaním alebo adopciou chlpatého priateľa. Spoločne môžeme vytvoriť lepšiu budúcnosť pre psy v Žiline.",
    },
  },
  form: {
    progressAria: "Postup formulára",
    stepLabels: {
      one: "Výber útulku",
      two: "Osobné údaje",
      three: "Potvrdenie",
    },
    buttons: {
      back: "Späť",
      next: "Pokračovať",
      submit: "Odoslať formulár",
    },
    stepOne: {
      title: "Vyberte si možnosť, ako chcete pomôcť",
      projectTitle: "O projekte",
      optionTask: "Prispieť konkrétnemu útulku",
      optionFoundation: "Prispieť celej nadácii",
      helpTypeAria: "Forma pomoci",
      shelterLabel: "Útulok",
      optional: "(Nepovinné)",
      shelterPlaceholder: "Vyberte útulok zo zoznamu",
      shelterLoading: "Načítavam útulky...",
      shelterError: "Útulky sa nepodarilo načítať",
      shelterEmpty: "Zoznam útulkov je prázdny",
      amountLabel: "Suma, ktorou chcem prispieť",
    },
    stepTwo: {
      title: "Potrebujeme od Vás zopár informácií",
      sectionTitle: "O vás",
      firstNameLabel: "Meno",
      lastNameLabel: "Priezvisko",
      emailLabel: "E-mailová adresa",
      phoneLabel: "Telefónne číslo",
      countryAria: "Krajina predvoľby",
      firstNamePlaceholder: "Zadajte Vaše meno",
      lastNamePlaceholder: "Zadajte Vaše priezvisko",
      emailPlaceholder: "Zadajte Váš e-mail",
      phonePlaceholder: "123 456 789",
      countries: {
        SK: "Slovensko",
        CZ: "Česko",
      },
    },
    stepThree: {
      title: "Skontrolujte si zadané údaje",
      summaryTitle: "Zhrnutie",
      helpTypeLabel: "Forma pomoci",
      helpTypeTask: "Finančný príspevok útulku",
      helpTypeFoundation: "Finančný príspevok celej nadácii",
      shelterLabel: "Útulok",
      shelterEmpty: "Nebol zvolený",
      amountLabel: "Suma príspevku",
      fullNameLabel: "Meno a priezvisko",
      fullNameEmpty: "Nezadané",
      emailLabel: "E-mail",
      phoneLabel: "Telefónne číslo",
      consentLabel: "Súhlasím so spracovaním mojich osobných údajov",
    },
    status: {
      validationError: "Formulár obsahuje chyby. Skontrolujte zvýraznené polia.",
      consentRequired: "Na odoslanie je potrebné potvrdiť súhlas so spracovaním údajov.",
      submitSuccess: "Ďakujeme! Váš príspevok bol úspešne zaznamenaný a veľmi si ho vážime.",
      submitError: "Formulár sa nepodarilo odoslať. Skúste to prosím znova.",
    },
    validation: {
      amountMin: "Suma príspevku musí byť aspoň 1 EUR.",
      shelterRequired: "Vyberte prosím útulok, ktorému chcete prispieť.",
      firstNameMax: "Meno môže mať najviac 20 znakov.",
      firstNameMin: "Meno musí mať aspoň 2 znaky.",
      lastNameMin: "Priezvisko musí mať aspoň 2 znaky.",
      lastNameMax: "Priezvisko môže mať najviac 30 znakov.",
      emailInvalid: "Zadajte platný e-mail.",
      phoneInvalid: "Zadajte tel. číslo v správnom formáte.",
      consentRequired: "Bez súhlasu nie je možné pokračovať.",
    },
  },
} as const;

export default sk;
