import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as seoConfig from 'src/app/seoconfig.json';


@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    private titleService: Title, 
    private meta: Meta
  ) { }
  setMeta(page: string) {
    this.setTitle(seoConfig[page].title);
    this.setNameAttribute('description', seoConfig[page].description);
    this.setNameAttribute('keywords', seoConfig[page].keywords);
    this.setNameAttribute('twitter:title', seoConfig[page].title);
    this.setNameAttribute('twitter:description', seoConfig[page].description);
    this.setNameAttribute('twitter:image', seoConfig[page].image);
    this.setPropertyAttribute('og:title', seoConfig[page].title);
    this.setPropertyAttribute('og:description', seoConfig[page].description);
    this.setPropertyAttribute('og:url', seoConfig[page].url);
    this.setPropertyAttribute('og:image', seoConfig[page].image);
  }

  /**
   * ajouter à la page le titre mis en paramètre
   */
   setTitle(title: string) {
    return this.titleService.setTitle(title);
  }

  /**
   * 
   * @param attribute attribuer des meta balises
   * @param value la valeur de l'attribut
   * si l'attribut existe déjà alors il faut le mettre a jour sinon il faut l'ajouter
   */
   setNameAttribute(attribute: string, value: string) {
    if (this.checkAttributeExist(attribute, 'name')) {
      this.meta.updateTag({name: attribute, content: value});
    } else {
      this.meta.addTag({name: attribute, content: value});
    }
  }

  /**
   * 
   * @param attribute propriétée de la balise Meta
   * @param value valeur  de la propriétée
   */
   setPropertyAttribute(attribute: string, value: string) {
    if (this.checkAttributeExist(attribute, 'property')) {
      this.meta.updateTag({property: attribute, content: value});
    } else {
      this.meta.addTag({property: attribute, content: value});
    }
  }
  /**
   * 
   * @param attribute 
   * @param type 
   * @returns retourner un boolean pour savoir si un meta attribut existe ou non
   */
   checkAttributeExist(attribute: string, type: string) {
    return this.meta.getTag(`${type}="${attribute}"`);
  }
}
