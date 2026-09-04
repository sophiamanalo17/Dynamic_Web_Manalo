import './style.css'; //

// react component is function that returns jsx
function App() {
  return (
    <div id="card">
        <div id="side">
          <div>
            <img src="/Pizookie Image.jpeg" alt="Placeholder" />
          </div>

        <div>
          <h1>Pizookie</h1>
          <h3>total time: 30 mins</h3>
          <p>A Pizookie is a warm, gooey cookie 
          served in a skillet, often topped with ice cream.</p>
        </div>
      </div>

      <div>
      <h3>Instructions:</h3>
      <ol>
        <li>Preheat the oven to 350°F (175°C).</li>
        <li>In a microwave safe bowl melt the butter and transfer into a mixing bowl.</li>
        <li>Add the brown sugar and whisk to combine. Add the vanilla and egg and continue to whisk until totally incorporated.</li>
        <li>Add the flour, baking powder, salt, and baking soda to the wet ingredients and mix until fully combined. Add the
           chocolate chips and mix to combine.</li>
        <li>Spray a medium sized skillet with baking 
          spray. Transfer the batter into the skillet
          and spread it evenly. Bake for 22-24 minutes
          until just still slightly gooey in the middle
          and golden around the edges. Remove from the
          oven and let rest for a few minutes before
          topping with scoops of ice cream and serving.
        </li>
      </ol>
      </div>
    </div>
  )
}

export default App