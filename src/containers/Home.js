import React, { Component } from 'react'

import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'

class Home extends Component {
  render () {
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Paper style={{ padding: 16 }}>
              <Typography variant='headline'>
                Bem-vindo ao Descartaê!
              </Typography>


              <p>Adicione e gerencie dados sobre pontos de coleta no Brasil</p>
              <p>Os dados que você inseriu estão conectados aos aplicativos móveis. </p>
              <p>Isso ajudará as pessoas a encontrar pontos de coleta próximos e a descobrir informações sobre quais tipos de resíduos são aceitos.</p>
              <p>Obrigado por gerenciar dados em seus pontos de coleta locais.</p>
              <p>Vá para o <strong><a href='/facilities'>painel</a></strong> para visualizar, adicionar, editar ou remover dados em pontos de coleta</p>

              <hr/>
              <h3>Por que se preocupar?</h3>
              <p>O mundo esta cada vez mais perto de chegar no limte de fornecimento de recursos naturais para produção de novos produtos. </p>
              <p>Por isso a importância da reciclagem. Ela reduz significativamente impacto sobre o meio ambiente diminuindo as retiradas </p>
              <p>de matéria-prima da natureza, gerando economia de água e energia e reduzindo disposição inadequada do lixo.</p>
            
              <p>São gerados 230k toneladas de lixo por dia no Brasil</p> 
              <p>Fonte: Pensamento verde</p>

              <hr/>
              <h3>Adicione pontos de coletas para diversos tipos de resíduos</h3>
              <ul>
                <li>Alumínio</li>
                <li>Eletrônico</li>
                <li>Móveis</li>
                <li>Papel & Papelão</li>
                <li>Verde</li>
                <li>Plástico</li>
                <li>Óleo de cozinha</li>
                <li>Orgânico</li>
                <li>Vidro</li>
                <li>Radioativo</li>
              </ul>
              <hr/>
              <h3>Os bastidores do Projeto</h3> 
              <h4>Das bibliotecas para mundo</h4>
              <p>A ideia do aplicativo surgiu da iniciativa de um projeto chamado Feito na Biblioteca. </p>
              <p>O projeto visa conectar usuários das bibliotecas públicas da Grande Belo Horizonte e Rio Grande do Sul aos dados abertos do governo para melhorar a vida cotidiana da sociedade.</p>
              <p>O Descartaê é um projeto open source e sua base de dados é alimentada por bibliotecários vonlutários de cada cidade envolvida </p>

              <p> Ver o <a href='https://github.com/descartae/webportal'>open source repositório</a></p>

              <p>Oferecido por: <a href='http://www.feitonabiblioteca.org/'>Feito na Biblioteca</a> & <a href='http://caravanstudios.org'>Caravan Studios</a> </p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Home
