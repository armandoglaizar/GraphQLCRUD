import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from '../query';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [];
  product = { name: '', description: '' };
  
  update: boolean = false;
  updateId: Number;

  constructor(private apollo: Apollo) { 
  
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.apollo.watchQuery({ query: Query.Products }).valueChanges
      .subscribe(response => {
        this.products = response.data['products'];
      }
    );
  }

  deleteProduct(id: string) {
    this.apollo.mutate({
      mutation: Query.deleteProduct,
      variables: {
        id: id
      },
      update: (proxy, { data: { deleteProduct } }) => {
        const data: any = proxy.readQuery({ query: Query.Products });
        
        const index = this.products.findIndex(x => x.id == id);
        this.products.splice(index, 1);

        proxy.writeQuery({ query: Query.Products, data });
      }
    }).subscribe(({data}) => {
      console.log(data);
    }, (error) => {
      console.log('error', error);
    });;
  }

  updateFunc(product: any) {
    this.update = true;
    this.updateId = product.id;

    this.product.name = product.name;
    this.product.description = product.description;
  }

  createFunc() {
    this.update = false;
    
    this.product.name = "";
    this.product.description = "";
  }

  updateProduct() {
    this.apollo
      .mutate({
        mutation: Query.updateProduct,
        variables: {
          id: this.updateId,
          name: this.product.name,
          description: this.product.description
        },
        update: (proxy, { data: { updateProduct } }) => {
          const data: any = proxy.readQuery({ query: Query.Products });

          const foundIndex = this.products.findIndex(x => x.id == this.updateId)
          this.products[foundIndex] = updateProduct;

          proxy.writeQuery({ query: Query.Products, data });
        }
      }).subscribe(({data}) => {
        console.log(data);
      }, (error) => {
        console.log('error', error);
      });
  }

  createProduct() {
    this.apollo.mutate( {
      mutation: Query.createProduct,
      variables: {
        name: this.product.name,
        description: this.product.description
      },
      update: (proxy, { data: { createProduct } }) => {
        const data: any = proxy.readQuery({ query: Query.Products });

        this.products.push(createProduct);

        proxy.writeQuery({ query: Query.Products, data });
      }
    }).subscribe(({data}) => {
      console.log(data);
      this.product.name = "";
      this.product.description = "";
    }, (error) => {
      console.log('error', error);
    });
  }
}