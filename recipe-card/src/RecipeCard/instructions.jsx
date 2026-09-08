import {RECIPE_DATA} from './recipe-data.js'

//.map
const RecipeInstructions = (props) => {
    const { instructions } = props;
    return (
        <>
            <h3>Instructions:</h3>
            <ul>
                {instructions.map((instruction, index) => {
                    return <li key={index}>{instruction}</li>;
                })}
            </ul>
        </>
    )
}

export default RecipeInstructions