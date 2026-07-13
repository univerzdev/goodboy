const cz = {
  app: {
    title: "Good Boy",
    description: "Zlepšování života psů v Žilině",
  },
  footer: {
    contact: "Kontakt",
    about: "O projektu",
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
      title: "O projektu",
      lead: "Nadace Good Boy se věnuje zlepšování života psů v Žilině na Slovensku. Zachraňujeme opuštěné, týrané a bezdomovské psy, poskytujeme jim lékařskou péči, útočiště a lásku, kterou si zaslouží. Naším posláním je dát těmto věrným společníkům druhou šanci na život tím, že jim najdeme milující domov. Kromě záchrany a rehabilitace se zaměřujeme také na podporu zodpovědného vlastnictví zvířat a ochrany zvířat prostřednictvím vzdělávacích a komunitních programů.",
      stats: {
        amount: {
          value: "12 200 €",
          label: "Celková vybraná hodnota",
        },
        donors: {
          value: "1 028",
          label: "Počet dárců",
        },
      },
      body: "Naše práce je možná díky podpoře vášnivých dobrovolníků, štědrých dárců a komunity, která se hluboce stará o dobro zvířat. Organizujeme také kastrační a sterilizační iniciativy, abychom řešili problém toulavých psů a zajistili dlouhodobý dopad. V nadaci Good Boy věříme, že každý pes si zaslouží bezpečný, milující domov a šťastný život. Přidejte se k nám a pomozte nám dělat změny - ať už dobrovolnictvím, darováním nebo adopcí chlupatého přítele. Společně můžeme vytvořit lepší budoucnost pro psy v Žilině.",
    },
  },
  form: {
    progressAria: "Postup formuláře",
    stepLabels: {
      one: "Výběr útulku",
      two: "Osobní údaje",
      three: "Potvrzení",
    },
    buttons: {
      back: "Zpět",
      next: "Pokračovat",
      submit: "Odeslat formulář",
    },
    stepOne: {
      title: "Vyberte si možnost, jak chcete pomoci",
      projectTitle: "O projektu",
      optionTask: "Přispět konkrétnímu útulku",
      optionFoundation: "Přispět celé nadaci",
      helpTypeAria: "Forma pomoci",
      shelterLabel: "Útulek",
      optional: "(Nepovinné)",
      shelterPlaceholder: "Vyberte útulek ze seznamu",
      shelterLoading: "Načítám útulky...",
      shelterError: "Útulky se nepodařilo načíst",
      shelterEmpty: "Seznam útulků je prázdný",
      amountLabel: "Částka, kterou chci přispět",
    },
    stepTwo: {
      title: "Potřebujeme od Vás pár informací",
      sectionTitle: "O vás",
      firstNameLabel: "Jméno",
      lastNameLabel: "Příjmení",
      emailLabel: "E-mailová adresa",
      phoneLabel: "Telefonní číslo",
      countryAria: "Země předvolby",
      firstNamePlaceholder: "Zadejte Vaše jméno",
      lastNamePlaceholder: "Zadejte Vaše příjmení",
      emailPlaceholder: "Zadejte Váš e-mail",
      phonePlaceholder: "123 456 789",
      countries: {
        SK: "Slovensko",
        CZ: "Česko",
      },
    },
    stepThree: {
      title: "Zkontrolujte zadané údaje",
      summaryTitle: "Shrnutí",
      helpTypeLabel: "Forma pomoci",
      helpTypeTask: "Finanční příspěvek útulku",
      helpTypeFoundation: "Finanční příspěvek celé nadaci",
      shelterLabel: "Útulek",
      shelterEmpty: "Není vybráno",
      amountLabel: "Částka příspěvku",
      fullNameLabel: "Jméno a příjmení",
      fullNameEmpty: "Nevyplněno",
      emailLabel: "E-mail",
      phoneLabel: "Telefonní číslo",
      consentLabel: "Souhlasím se zpracováním mých osobních údajů",
    },
    status: {
      validationError: "Formulář obsahuje chyby. Zkontrolujte zvýrazněná pole.",
      consentRequired: "Pro odeslání je potřeba potvrdit souhlas se zpracováním údajů.",
      submitSuccess: "Děkujeme! Váš příspěvek byl úspěšně zaznamenán a moc si ho vážíme.",
      submitError: "Formulář se nepodařilo odeslat. Zkuste to prosím znovu.",
    },
    validation: {
      amountMin: "Částka příspěvku musí být alespoň 1 EUR.",
      shelterRequired: "Vyberte prosím útulek, kterému chcete přispět.",
      firstNameMax: "Jméno může mít nejvíce 20 znaků.",
      firstNameMin: "Jméno musí mít alespoň 2 znaky.",
      lastNameMin: "Příjmení musí mít alespoň 2 znaky.",
      lastNameMax: "Příjmení může mít nejvíce 30 znaků.",
      emailInvalid: "Zadejte platný e-mail.",
      phoneInvalid: "Zadejte tel. číslo ve správném formátu.",
      consentRequired: "Bez souhlasu nelze pokračovat.",
    },
  },
} as const;

export default cz;
