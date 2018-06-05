import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import FeedbackIcon from 'material-ui-icons/Feedback'

class FacilityHome extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  static styles = theme => ({ })

  render () {
    return (
      <div>
        <p>Nessa página você poderá criar e editar pontos de coleta.</p>
        <p>O botão <strong>Criar Novo</strong> levará você ao formulário para criação de um novo ponto.</p>
        <p>Ao clicar em um item da lista, a página exibirá detalhes sobre o ponto escolhido.</p>
        <p>O botão <FeedbackIcon /> abrirá uma janela com os feedbacks dados ao ponto escolhido através do aplicativo.</p>

        <p><strong>Contato:</strong> Perguntas ou Feedbacks - E-mail <a href="mailto:feitonabiblioteca@caravanstudios.org">feitonabiblioteca@caravanstudios.org</a></p>
      </div>
    )
  }
}

export default withStyles(FacilityHome.styles, { withTheme: true })(FacilityHome)
