import hero_bg from './hero_bg.png';
import hero_elements from './hero_elements.png';
import logo from './logo.png';

import stationaries from './stationaries.png';
// import product images
import Note_book_1 from "./Note_book_1.jpg";
import Note_book_2 from "./Note_book_2.jpg";
import color_kit_1 from "./color_kit_1.jpg";
import color_kit_2 from "./color_kit_2.jpg";
import diary_1 from "./diary_1.jpg";
import diary_2 from "./diary_2.jpg";
import diary_3 from "./diary_3.jpg";
import color_kit_with_brushes_1 from "./color_kit_with_brushes_1.jpg";
import color_kit_with_brushes_2 from "./color_kit_with_brushes_2.jpg"
import hero_image from  "./hero_image.jpg"


//best selller products
export const ProductList = [
    {
        name: "Note Book",
        price: 99,
        description: "A note book for story writing",
        images: [Note_book_1, Note_book_2, ],
        discount: 0,
        bestSeller: true,
        _id: "p1",
    },
    {
        name: "diary",
        price: 149,
        description: "A diary for personal use",
        images: [diary_1, diary_2, diary_3 ],
        discount: 0,
        bestSeller: true,
        _id: "p2"
    },
    {
        name: "color Kit",
        price: 199,
        description: "color kit for drawing / painting",
        images: [ color_kit_1, color_kit_2 ],
        discount: 0,
        bestSeller: true,
        _id: "p3"
    },
    {
        name:"Color Kit with Brushes",
        price: 149,
        description: "color kit with brushes with 10 plus colors",
        images: [color_kit_with_brushes_2,color_kit_with_brushes_1 ],
        discount: 0,
        bestSeller: true,
        _id: "p4",

    }
   
]



//images assets
 export const assets = {
 hero_bg,
 hero_element: hero_elements,
 logo,
 stationaries,
 hero_image,
 
};
