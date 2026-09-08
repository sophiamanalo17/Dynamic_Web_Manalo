import {RECIPE_DATA} from './recipe-data.js'

const RecipeImg = (props) => {
    //destructuring
    const{ imgSrc, imgAlt } = props;
    return (<img src={imgSrc} alt={imgAlt} />)
}

//props vome from parent component (RecipeCard.jsx) and is passed down to child component (RecipeImg.jsx) 
export default RecipeImg