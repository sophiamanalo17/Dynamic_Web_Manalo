import {RECIPE_DATA} from './recipe-data.js'


//.map

// const RecipeIngredients = (props) => {
//     const { ingredients } = props;
//     return (
//         <>
//             <h3>Ingredients:</h3>
//             <ul>
//                 {ingredients.map((ingredient, index) => {
//                     return <li key={index}>{ingredient}</li>;
//                 })}
//             </ul>
//         </>
//     )
// }

// export default RecipeIngredients

export default function RecipeIngredients(props) {
  const {ingredients} = props

  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((i, index) => (
          <li key={index}>
            <span>{i.measure}</span>
            <span>{i.item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}