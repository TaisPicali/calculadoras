import { Component } from '@angular/core';
import { evaluate } from 'mathjs'
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

public resultado:string;
public calculo='';

private ponto = false;
private operacoes = ['+','-','/','*'];

  constructor(public alertController: AlertController) {}

 adicionarNumero(valor){
   if(this.resultado){
     this.apagarTudo();
   }
   this.calculo = this.calculo + valor;
 }

  // verifica se já há ponto na tela
 // caso haja ele retornará vazio e irá parar no "if"
 // caso não haja "." ele fará a leitura do restante do código
 public adicionarPonto(){
  if (this.ponto){
   return; 
  }
  this.calculo += ".";
  this.ponto = true;
}

 adicionarOperacao(operador: string){

  if(this.resultado) {
    this.calculo = this.resultado.toString();
    this.resultado = null;
  }

const ultimo = this.calculo.slice(-1);
if(this.operacoes.indexOf(ultimo) > -1 ){ //indexOf verifica se o ultimo caracter é uma das operações
return;
} 

   this.calculo += operador;
   this.ponto = false; // para que a cada novo número possa utilizar o ponto
 }

//zera a calculadora
 public apagarTudo(){
   this.calculo = ''; //deixa a variável do cálculo nula
   this.resultado = null; //anula a variável resultado
   this.ponto = false;
 }

 public apagarUltimo(){
   const ultimo = this.calculo.slice(-1); // verifica ultimo caracter do cálculo
   if(ultimo == "."){ //realiza um teste
     this.ponto = false;
   }
   this.calculo = this.calculo.slice(0, -1); // Extrai partes de um texto
 }

 public calcularResultado() {
   try{
   this.resultado = evaluate(this.calculo);
   } catch (e) {
     this.resultado = '';
     this.presentAlert('ERRO!!!', 'Cálculo Invalido, VERIFIQUE');
   }
 }

 async presentAlert(titulo: string, mensagem: string) {
  const alert = await this.alertController.create({
    header: titulo,
    message: mensagem,
    buttons: ['OK']
  });

  await alert.present();
}


}
