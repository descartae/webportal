import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql, compose } from 'react-apollo'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'

import Loading from '../components/Loading'

class Home extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  }

  static styles = theme => ({
    typesOfWastePaper: {
      margin: '20px 10px',
      padding: 5,
      textAlign: 'center'
    },
    typesOfWaste: {
      margin: 5
    },
    emphasis: {
      textAlign: 'center',
      color: theme.palette.primary.main,
      fontWeight: 'bold'
    },
    link: {
      color: theme.palette.primary.main,
      fontWeight: 'bold'
    }
  })

  render () {
    const { loading, typesOfWaste } = this.props.TypesOfWasteListQuery
    const { classes } = this.props

    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Paper style={{ padding: 16 }}>
              <Typography variant='headline'>
                Bem-vindo ao Descartaê!
              </Typography>

              <Grid container>
                <Grid item xs={6}>
                  <p>Adicione e gerencie dados sobre pontos de coleta de lixo no Brasil.</p>
                  <p>Os dados que você inseriu estão conectados aos aplicativos móveis. Isso ajudará as pessoas a encontrar pontos de coleta próximos e a descobrir informações sobre quais tipos de resíduos são aceitos.</p>
                  <p>Vá ao <strong><Link to={`/facilities`}>painel</Link></strong> para visualizar, adicionar, editar ou remover dados em pontos de coleta.</p>
                  <p className={classes.emphasis}>Obrigado por manter atualizados os dados de seus pontos locais de coleta! <span role="img" aria-label="Feliz">😄</span></p>

                  <Typography variant='title' gutterBottom>
                  Por que se preocupar?
                  </Typography>

                  <p>O mundo está cada vez mais perto de chegar no limte de fornecimento de recursos naturais para produção de novos produtos.</p>
                  <p>Por isso a importância da reciclagem. Ela reduz significativamente impacto sobre o meio ambiente, diminuindo as retiradas de matéria-prima da natureza, gerando economia de água e energia e reduzindo disposição inadequada do lixo.</p>

                  <p className={classes.emphasis}>São geradas 230 mil toneladas de lixo por dia no Brasil. <span role="img" aria-label="Medo">😨</span> <br /> <small>Fonte: Pensamento verde</small></p>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='title' gutterBottom>
                  Adicione pontos de coletas de diversos tipos de resíduos
                  </Typography>

                  <Paper className={classes.typesOfWastePaper}>

                  {
                    loading ?
                      <Loading /> :
                      (typesOfWaste.map(({ _id, name, icons: { androidMediumURL } }) => (
                        <Chip
                          key={_id}
                          onClick={() => {}}
                          component={Link} to={`/facilities/add?type=${_id}`}
                          className={classes.typesOfWaste}
                          avatar={<Avatar src={androidMediumURL} />}
                          label={name}
                        />
                      )))
                  }

                  </Paper>

                  <Typography variant='title'>
                  Os bastidores do Projeto
                  </Typography>
                  <Typography variant='subheading'>
                  Das bibliotecas para mundo <span role="img" aria-label="Livros e Mundo">📚🌎</span>
                  </Typography>

                  <p>A ideia do aplicativo surgiu da iniciativa de um projeto chamado <strong>Feito na Biblioteca</strong>. </p>
                  <p>O projeto visa conectar usuários das bibliotecas públicas da Grande Belo Horizonte e Rio Grande do Sul aos dados abertos do governo para melhorar a vida cotidiana da sociedade.</p>
                  <p>O Descartaê é um projeto open source e sua base de dados é alimentada por bibliotecários vonlutários de cada cidade envolvida </p>

                  <p>Oferecido por: <a className={classes.link} href='http://www.feitonabiblioteca.org/'>Feito na Biblioteca</a> e <a className={classes.link} href='http://caravanstudios.org'>Caravan Studios</a></p>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export const TypesOfWasteListQuery = gql`
  query TypesOfWasteListQuery {
    typesOfWaste {
      _id
      name
      icons {
        androidMediumURL
      }
    }
  }
`

export default compose(
  withStyles(Home.styles, { withTheme: true }),
  graphql(TypesOfWasteListQuery, { name: 'TypesOfWasteListQuery' }),
)(Home)
