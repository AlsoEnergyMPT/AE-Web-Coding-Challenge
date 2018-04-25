/*****************************************************************************************
* Part 2
****************************************************************************************/
//Example array of objects to be apssed in to the sort function
var employees = 
	[
        {first: "Amanda", last: "Byron", group: "Sales"},
        {first: "Ye", last: "Xia", group: "Receiving", nameOrder: "reverse"},
        {first: "Miltiades", last: "Crescens", group: "Sales"},
        /*...don't foget to account for other entries of the same form, but with different group names.....*/
    ];

function sort(input)
{
	var output = {}; //Declare an object variable to hold the sorted output
	
	//Iterate through each element in the input array
	for (var i in input)
	{		
		var person = {}; //Declare an object to represent the person being read in from the input array
		var group = input[i].group; //Grab the group that the current person is associated with
		
		/* Check if the name order should be reversed. If yes, assign the (Lastname Firstname) format to the
		 * person object. Otherwise assign the (Firstname Lastname) format to the person object.
		 * If no nameOrder is specified, it compares Undefined against the string, which will evaluate to 'false' */
		if (input[i].nameOrder == "reverse") 
		{
			person.name = input[i].last + " " + input[i].first;
		}
		else
		{
			person.name = input[i].first + " " + input[i].last;
		}
		
		/* Check if the group that is currently being looked at exists in the output yet. 
		 * If not, add it as an empty array that can be pushed to.
		 * (i.e. Same as checking if output.Sales is defined) */
		if (!output[group])
		{
			output[group] = [];
		}
		
		//Associate the new person object with their group in the output object
		output[group].push(person);
	}
	
	//Return the sorted output to the function caller, and write the object into the console to check its structure/contents
	console.log(output);
	return output;
}

/*****************************************************************************************
* Bonus
****************************************************************************************/
//(See rabbit.js)
