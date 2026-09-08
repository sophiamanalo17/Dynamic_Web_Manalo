import { RECIPE_DATA } from './recipe-data.js'
import RecipeImg from './recipe-img.jsx'
import RecipeInfo from './recipe-info.jsx'
import RecipeIngredients from './ingredients.jsx'
import RecipeInstructions from './instructions.jsx'
import Card from './card.jsx'

//componentize all atomic parts

const RecipeCard = () => {
  return (
    <Card>
      <RecipeImg imgSrc={RECIPE_DATA.image} imgAlt={RECIPE_DATA.imageAlt} />
      <RecipeInfo />
      <RecipeIngredients ingredients={RECIPE_DATA.ingredientsList} />
      <RecipeInstructions instructions={RECIPE_DATA.instructions} />
    </Card>
  )
}

export default RecipeCard