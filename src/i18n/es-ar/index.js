// This is just an example,
// so you can safely delete all default props below

export default {
  brand: 'Estamos Varados!',
  ok: 'Ok',
  accept: 'Acepto',
  cookiesText:
    'Este sitio web usa cookies, si permaneces aquí, aceptas su uso. Puedes leer más sobre el uso de cookies en nuestra <a href="privacy">política de privacidad</a>',
  general: {
    slogan: 'Queremos volver a casa'
  },
  user: {
    closeSession: 'Cerrar sesión',
    initSession: 'Iniciar sesión',
    loginBySocial: 'Iniciar sesión con redes sociales',
    welcomeMessage: 'Esperamos que puedas lograr volver a casa, {firstName}!',
    errors: {
      wrongSocialLogin: 'Error al iniciar sesión. Prueba ingresando a la aplicación con Chrome o Firefox por favor!'
    }
  },
  address: {
    province: 'Provincia',
    locality: 'Localidad',
    address: 'Dirección',
    addressHint: 'No es necesaria una dirección exacta',
    addressPlaceholder: 'Ej: San Martín 1200',
    searching: 'Buscando ubicación'
  },
  home: 'Inicio',
  menu: 'Menú',
  cancel: 'Cancelar',
  phone: 'Teléfono',
  email: 'E-mail',
  send: 'Enviar',
  name: 'Nombre',
  admin: 'Administración',
  message: 'Mensaje',
  type: 'Tipo',
  createdAt: 'Fecha carga',
  mobility: 'Movilidad',
  back: 'Volver',
  contact: {
    title: 'Contacto',
    text:
      'Formulario de contacto. Intentaremos leer todos los mensajes. <b>Por favor no escribas aquí tu caso, para eso, utiliza el <a href="/">Formulario inicial</a>. Gracias!',
    thanks:
      'Gracias por escribirnos. Contestaremos a la mayor brevedad posible.'
  },
  nearCases: {
    title: 'Buscar casos cercanos',
    text:
      'Estamos construyendo esta sección. En los próximos días estará disponible.',
    lookup: 'Buscar gente cerca'
  },
  stats: {
    title: 'Estadísticas',
    subtitle: 'La situación de varados hoy',
    map: 'Mapa de casos',
    mapNote: '<b>Nota:</b>Los puntos se han movido ligeramente en forma aleatoria de la posición real de los varados, para preservar su identidad y seguridad',
    'mapText-lines': 'Cada linea del mapa es la distancia que separa a una persona de su casa en este momento...',
    'mapText-circles': 'Cada punto del mapa es una persona que quiere volver a su casa y no puede, y una familia que está esperando a alguien...',
    'show-circles': 'Ver puntos',
    'show-lines': 'Ver lineas',
    chartByProvince: 'Varados por provincia'
  },
  case: {
    list: 'Lista de casos',
    myCases: 'Casos que reporté',
    saved: 'Tu caso ha sido guardado',
    savedText1: '¿Cómo sigo?',
    savedText2:
      'Ahora que tu caso está cargado, el sistema intentará buscar situaciones similares a la tuya con el fin de unirte.',
    createText:
      'Completá por favor el siguiente formulario. Esta aplicación buscará conectarte con gente en tu situación para que Unidos puedan volver sanos y salvos a sus casas.',
    additionalInfo: 'Información adicional de tu situación',
    send: 'Enviar formulario',
    myContactInfo: 'Mi información de contacto',
    allowContactByPhone: 'Permitir que me contacten por teléfono / whatsapp?',
    allowContactByEMail: 'Permitir que me contacten por mail?',
    stuck: {
      title: 'Estoy varado/a',
      caption: 'Solo o con mi grupo familiar',
      color: 'red-8',
      icon: 'img:statics/logo-w.svg',
      fields: {
        origin: 'Origen',
        originHint: 'Lugar dónde estás actualmente',
        destination: 'Destino',
        stuckedPeopleCount: 'Cuántas personas son en tu grupo?',
        destinationHint: 'A dónde querés llegar',
        mobility: 'Tenés movilidad propia?',
        additionalPlaces: 'Podés llevar a alguien más? Cuántos?',
        economicalIssues: 'Estás en una emergencia económica?',
        healthIssues: 'Tenés problemas de salud?',
        observations: 'Observaciones'
      }
    },

    relativeStuck: {
      title: 'Tengo un familiar varado',
      caption: 'Solo o con un grupo',
      color: 'orange-7',
      icon: 'img:statics/logo-w.svg',
      fields: {
        origin: 'Origen',
        originHint: 'Lugar dónde la persona actualmente',
        stuckedPeopleCount: 'Cuántas personas son en el grupo?',
        destination: 'Destino',
        destinationHint: 'A dónde quiere llegar la persona',
        mobility: 'La persona tiene movilidad propia?',
        additionalPlaces: 'La persona puede llevar a alguien más? Cuántos?',
        economicalIssues: 'Tu familiar/amigo está en una emergencia económica?',
        healthIssues: 'Tiene problemas de salud?',
        observations: 'Observaciones'
      }
    },
    positiveExperience: {
      title: 'Ya volví a mi casa!',
      caption: 'Nos puede servir saberlo',
      icon: 'fa fa-thumbs-up',
      color: 'light-green-7',
      fields: {
        origin: 'Origen',
        originHint: 'Lugar donde estabas varado',
        stuckedPeopleCount: 'Cuántas personas eran?',
        destination: 'Destino',
        destinationHint: 'A dónde volví',
        mobility: 'Volviste en auto?',
        route: 'Ruta/s por las que se circuló',
        routeHint: 'Indicá por dónde volviste: Rutas, caminos, etc',
        permissions: 'Qué permisos/documentación llevaste?',
        controls: 'Experiencia en controles camineros',
        controlsHint: '(gendarmería, policía, etc)',
        economicalIssues:
          'La situación te estuvo / está trayendo problemas económicos?',
        healthIssues: 'Tuviste/tenés problemas de salud debido a la situación?',
        observations: 'Contá cualquier información adicional'
      }
    },

    negativeExperience: {
      title: 'Intenté volver y fracasé',
      caption: 'Me tuve que volver',
      icon: 'fa fa-thumbs-down',
      color: 'deep-orange-6',
      fields: {
        origin: 'Origen',
        originHint: 'Lugar donde estás/estabas varado',
        stuckedPeopleCount: 'Cuántas personas eran?',
        destination: 'Destino',
        destinationHint: 'A dónde intentaste volver',
        mobility: 'Volviste en auto?',
        route: 'Ruta/s por las que se circuló',
        routeHint: 'Indicá por dónde volviste: Rutas, caminos, etc',
        permissions: 'Qué permisos/documentación llevaste?',
        controls: 'Experiencia en controles camineros',
        controlsHint: '(gendarmería, policía, etc)',
        economicalIssues:
          'La situación te estuvo / está trayendo problemas económicos?',
        healthIssues:
          'Tuviste / tenés problemas de salud debido a la situación?',
        observations: 'Contá cualquier información adicional'
      }
    }
  },
  githubProject: 'Proyecto github',
  landing: {
    text1: 'Varados en Argentina',
    text2:
      'Este es un sitio construido para ayudar a que las personas varadas se conecten entre sí para que surjan soluciones a este lamentable problema que afecta a miles de argentinos.',
    text3:
      'Para que esta iniciativa funcione, es necesario que <b>ingreses tu caso</b>:'
  },
  footer: {
    text1: '2020',
    text2: 'Licenciado en los términos BSD',
    terms: 'Términos y condiciones',
    privacy: 'Política de privacidad'
  },
  vmsg: {
    required: 'Por favor ingresá un valor',
    maxLength: 'Por favor ingresá hasta {maxLength} caracteres',
    phone: 'Ingresá un teléfono válido por favor',
    email: 'Ingresa un email válido'
  },
  faq: {
    title: 'Preguntas frecuentes',
    list: [
      {
        title: '¿Por qué existe este sitio?',
        text:
          'Desde que se instauró la restricción de circulación, un número elevado de personas (en Argentina más de 20.000) quedaron varados, lejos de sus casas y con imposibilidad de regresar. El Estado no ha brindado solución a los problemas ocasionados por la medida extrema de aislamiento adoptada.'
      },
      {
        title: '¿Este sitio es gubernamental?',
        text:
          'Este sitio es una iniciativa sin fines de lucro generada dentro de la comunidad de varados. No responde a ningún partido político ni recibe ningún tipo de subsidio'
      },
      {
        title: '¿Puedo colaborar con el mismo?',
        text:
          "Si, en caso de querer colaborar, te pido por favor lo hagas mediante el formulario <a href='/contact'>de contacto</a>."
      },
      {
        title: '¿Quién financia este sitio?',
        text:
          "Este sitio esta enteramente mantenido por su creador, un miembro de la comunidad de varados. Se aceptan donaciones, en caso de querer hacerlo, te pido lo hagas mediante el formulario <a href='/contact'>de contacto</a>. "
      }
    ]
  }
}
