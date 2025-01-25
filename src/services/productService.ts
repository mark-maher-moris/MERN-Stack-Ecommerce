import productModel from "../models/productModel";


export const getAllProducts = async () => {
    return await productModel.find();
}


export const seedInitialProducts = async () => {
    try {     const products = [
        {
            name: "MackBook M1 2022",
            price: 100,
            quantity: 10,
            description: "Description 1",
            category: "Category 1",
            image: "https://www.apple.com/newsroom/images/product/mac/standard/Apple_new-macbookair-wallpaper-screen_11102020_big.jpg.large.jpg",
            stock: 5,   
        },
      
    ];  

    const dbProducts = await getAllProducts ();
    if(dbProducts.length === 0){
        await productModel.insertMany(products);
        console.log("Products seeded successfully");
      } }catch(error){
        console.log(error);
    }
 

}


