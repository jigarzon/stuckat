// This is just an example,
// so you can safely delete all default props below

export default {
  brand: 'Estamos Varados!',
  ok: 'Ok',
  searchNearby: {
    label: 'Buscar gente cerca'
  },
  general: {
    slogan: 'Queremos volver a casa'
  },
  user: {
    closeSession: 'Cerrar sesión',
    initSession: 'Iniciar sesión',
    loginBySocial: 'Iniciar sesión con redes sociales',
    welcomeMessage: 'Esperamos que puedas lograr volver a casa, {firstName}!'
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
  case: {
    myCases: 'Casos que reporté',
    createText:
      'Completá por favor el siguiente formulario. Esta aplicación buscará conectarte con gente en tu situación para que Unidos puedan volver sanos y salvos a sus casas.',
    additionalInfo: 'Información adicional de tu situación',
    send: 'Enviar formulario',
    stuck: {
      title: 'Estoy varado/a',
      caption: 'Solo o con mi grupo familiar',
      color: 'red-8',
      icon: 'img:statics/logo-w.svg',
      fields: {
        origin: 'Origen',
        originHint: 'Lugar dónde estás actualmente',
        destination: 'Destino',
        destinationHint: 'A dónde querés llegar',
        mobility: 'Tenés mobilidad propia?',
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
        destination: 'Destino',
        destinationHint: 'A dónde quiere llegar la persona',
        mobility: 'La persona tiene mobilidad propia?',
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
  landing: {
    text1: 'Varados en Argentina',
    text2:
      'Este es un sitio construido para ayudar a que las personas varadas se conecten entre sí para que surjan soluciones a este lamentable problema que afecta a miles de argentinos.',
    text3:
      'Para que esta iniciativa funcione, es necesario que <b>ingreses tu caso</b>:'
  },
  footer: {
    text1: '2020'
  },
  vmsg: {
    required: 'Por favor ingresá un valor',
    maxLength: 'Por favor ingresá hasta {0} caracteres'
  }
}
