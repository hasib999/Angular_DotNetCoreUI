import { CardsService } from './service/cards.service';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/models/card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cards';
  cards: Card[] = [];
  button="Save";
  card:Card={
    id:'',
    cardNumber:'',
    cardHolderName:'',
    expiryMonth:'',
    expiryYear:'',
    cvc:''
  }

  constructor(private cardsService:CardsService){

  }
  ngOnInit(): void {
    this.getAllCards();
  }
  getAllCards(){
    this.cardsService.getAllCards().subscribe(response=>{
      this.cards = response;
    });
  }
  onSubmit(){
    if(this.card.id ===''){
      this.cardsService.addCard(this.card)
      .subscribe(response=>{
        console.log(response);
        this.getAllCards();
        this.card={
          id:'',
          cardNumber:'',
          cardHolderName:'',
          expiryMonth:'',
          expiryYear:'',
          cvc:''
        }
      })
    }
    else{
      this.updateCard(this.card);
      this.button = "Save"
    }
    
  }

  deleteCard(id:string){
    this.cardsService.deleteCard(id)
    .subscribe(response=>{
      this.getAllCards();
    })
  }

  populateForm(card:Card){
    this.card = card
    this.button = "Update"
  }

  updateCard(card:Card){
    this.cardsService.updateCard(card)
    .subscribe(response=>{
      this.getAllCards();
      this.card={
        id:'',
        cardNumber:'',
        cardHolderName:'',
        expiryMonth:'',
        expiryYear:'',
        cvc:''
      }
    })
  }
}
