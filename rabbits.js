/*****************************************************************************************
* Bonus
****************************************************************************************/

//Create an array to track rabbit generations, initialized with an empty array for the starting generation
var rabbitGenerations = [[]];

//Grab the existing body and button HTML and create jquery objects out of them
var body = $("#content"); 
var generateBtn = $("#generateBtn"); 

//Grab the content area's dimensions
var screenWidth = body.width();
var screenHeight = body.height();

//Create the 3 initial rabbits, assigning null as the parent, and associating them with the inital generation
for (var i = 0; i < 3; i++)
{
	createRabbit(null,rabbitGenerations[0]);
}

generateBtn.click
(
	//Define the on-click anonymous function in-line to handle pressing the 'Generate' button 
	function()
	{	
	
		//Determine the current generation of rabbits and add them to the overall array of all rabbit generations
		var latestGeneration = rabbitGenerations[rabbitGenerations.length-1]; //Array of all rabbits in the current generation that are about to reproduce
		var newGeneration = []; //Empty array to reference all rabbits that will be spawned in the upcoming generation
		rabbitGenerations.push(newGeneration); //Add the empty array of future children to the total rabbit genealogy array
	
		//Loop through all rabbits in the current generation
		for (var i in latestGeneration)
		{
			var parentRabbit = latestGeneration[i]; //Grab the current rabbit's parent
			
			/* Determine how many children the current rabbit will produce. Since random returns a value
			 * of 0 <= x < 1, we multiply by 6 and round down to produce a random number between 0 and 5.*/
			var numChildren = Math.floor(Math.random() * 6);
			
			//Loop through the number of children to be produced and create new rabbits 
			for (var j = 0; j < numChildren; j++)
			{
				createRabbit(parentRabbit, newGeneration);															
			}
			
			//Associate the children rabbits with their parent for tracking genealogies
			parentRabbit.data("rabbitChildren",parentRabbit.rabbitChildren);			
		}

		/* Create a new jquery object to represent the currently selected rabbit (if any) and simulate a click 
		 * on it to update the highlighted rabbits to include the new generation. */
		var selectedRabbit = $(".selectedRabbit");
		selectedRabbit.click();
	}
)

function highlightRabbits(event)
{
	//Remove the CSS class attributes used for styling rabbit genealogies from all existing rabbits
	$(".rabbit").removeClass("selectedRabbit");
	$(".rabbit").removeClass("parentRabbit");
	$(".rabbit").removeClass("childRabbit");
	
	//Grab the currently selected rabbit as a jquery object 
	var currentRabbit = $(event.target);
	
	//Apply a CSS class to the currently selected rabbit to give it a pronounced white border
	currentRabbit.addClass("selectedRabbit");
	
	//Grab the currently selected rabbit's parent
	var parentRabbit = currentRabbit.data("rabbitParent");
	
	//Ascend the rabbit parent genealogy to highlight all of the parents of the selected rabbit
	while(parentRabbit)
	{
		//Apply a CSS class to the currently selected rabbit's parents to color them blue
		parentRabbit.addClass("parentRabbit");
		
		//Iterate to the next parent rabbit higher up in the genealogy to continue the loop
		parentRabbit = parentRabbit.data("rabbitParent");
	}
	
	//Highlight all of the currently selected rabbit's children
	highlightChildren(currentRabbit);
	
}

function highlightChildren(recursionRabbit)
{
	//Grab the array of the current rabbit's children
	var children = recursionRabbit.data("rabbitChildren");
	
	/* Recursively call highlightChildren() to traverse all of the selected rabbit's offspring
	 * and apply a CSS class to each child to color them yellow */
	for (var i in children)
	{
		children[i].addClass("childRabbit");
		highlightChildren(children[i]);
	}
}

function createRabbit(parentRabbit, newGeneration)
{
	//Create <div>s to represent the new rabbits, and add them to the page's HTML so they get rendered
	var childRabbit = $('<div class="rabbit"></div>');
	body.append(childRabbit);
	
	//Set the initial characteristics for the first generation of rabbits
	if (parentRabbit == null)
	{
		//Grab the dimensions of the starting rabbits from their CSS attributes
		childRabbit.rabbitWidth = childRabbit.outerWidth();
		childRabbit.rabbitHeight = childRabbit.outerHeight();
		
		//Spawn the initial rabbits at a random location within the confines of the content area
		childRabbit.rabbitTop = Math.floor((Math.random()*(screenHeight-childRabbit.rabbitHeight)));
		childRabbit.rabbitLeft = Math.floor((Math.random()*(screenWidth-childRabbit.rabbitWidth)));
	}
	
	//Set the initial characteristics for all subsequent generations of rabbits
	else
	{
		//Spawn children with 2/3 the dimensions of their parent
		childRabbit.rabbitWidth = Math.floor(parentRabbit.rabbitWidth * 2 / 3);
		childRabbit.rabbitHeight = Math.floor(parentRabbit.rabbitHeight * 2 / 3);
		
		//Associate the new rabbit as a child of the parent rabbit
		parentRabbit.rabbitChildren.push(childRabbit);
		
		//Spawn the new rabbit at a random point around the parent at a fixed distance
		var angle = Math.random() * 2 * Math.PI;
		var distance = 150;
		childRabbit.rabbitTop = parentRabbit.rabbitTop + (Math.sin(angle) * distance) + parentRabbit.rabbitHeight / 6;
		childRabbit.rabbitLeft = parentRabbit.rabbitLeft + (Math.cos(angle) * distance) + parentRabbit.rabbitWidth / 6;
	}
	
	//Write the new rabbits position and dimensions to the CSS
	childRabbit.css("top",childRabbit.rabbitTop + "px");
	childRabbit.css("left",childRabbit.rabbitLeft + "px");  
	childRabbit.css("width",childRabbit.rabbitWidth + "px");
	childRabbit.css("height",childRabbit.rabbitHeight + "px");	
	
	//Create an empty array to track any children that the new rabbit produces	
	childRabbit.rabbitChildren = [];
	
	/* Add the new rabbit to the array of rabbits in the current generation
	 * Note that this array is passed by reference, and not duplicated which is how these rabbits ultimately end up in rabbitGenerations[] */
	newGeneration.push(childRabbit);
	
	/* Associate the new rabbit's parent with the new rabbit in the <div> itself, so that it can be pulled later
	 * This is important as the new jquery objets do not inherit the attributes of the parent rabbit without hooking into the HTML */
	childRabbit.data("rabbitParent",parentRabbit);

	//Attach the highlightRabbits() function to the new rabbit to show genealogies on click
	childRabbit.click(highlightRabbits);
}
