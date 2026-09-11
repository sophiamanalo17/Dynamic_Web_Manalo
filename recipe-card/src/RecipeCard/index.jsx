// information
import { RECIPE_DATA } from './recipe-data.js'

// components
import RecipeImg from './recipe-img.jsx'
import RecipeInfo from './recipe-info.jsx'
import RecipeIngredients from './ingredients.jsx'
import RecipeInstructions from './instructions.jsx'
import Card from './card.jsx'

//event handlers
import UserRating from './UserRating.jsx'


//module css
import styles from './RecipeCard.module.css'


//componentize all atomic parts

const RecipeCard = () => {
  return (
    <Card>
      <RecipeImg imgSrc={RECIPE_DATA.image} imgAlt={RECIPE_DATA.imageAlt} />
      <div className={styles.card_text}>
        <RecipeInfo />
        <div className={styles.card_lists}>
          <RecipeIngredients
            metric={RECIPE_DATA.ingredientsListMetric}
            imperial={RECIPE_DATA.ingredientsListImperial}
          />
          <RecipeInstructions instructions={RECIPE_DATA.instructions} />
        </div>
        <UserRating />
      </div>
    </Card>
  )
}

export default RecipeCard