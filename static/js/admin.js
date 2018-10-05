let get = function() {
	let lang = function(langs) {
		let strs = {
			c: (langs["c"] !== undefined) ? "checked" : "",
			cpp: (langs["cpp"] !== undefined) ? "checked" : "",
			py: (langs["py"] !== undefined) ? "checked" : "",
			js: (langs["js"] !== undefined) ? "checked" : ""
		};
		return `
<fieldset>
    <legend>Submission types</legend>
    <div class="row col-md-12">
        <div class="col-md-4">
            <div class="pull-right">
                <p>C</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="pull-left">
                <label class="checkbox checkbox-inline">
                    <input name="lang" value="c" data-language="C" type="checkbox" ${strs["c"]}><span class="checkbox-material"><span class="check"></span></span>
                </label>
            </div>
        </div>
        <div class="col-md-4">
            <div class="pull-left"><i aria-hidden="true" data-toggle="tooltip" data-placement="right" title="" data-original-title="Allow submission with C code" class="fa fa-question text-primary"></i></div>
        </div>
    </div>
    <div class="row col-md-12">
        <div class="col-md-4">
            <div class="pull-right">
                <p>C++</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="pull-left">
                <label class="checkbox checkbox-inline">
                    <input name="lang" value="cpp" data-language="C++" type="checkbox" ${strs["cpp"]}><span class="checkbox-material"><span class="check"></span></span>
                </label>
            </div>
        </div>
        <div class="col-md-4">
            <div class="pull-left"><i aria-hidden="true" data-toggle="tooltip" data-placement="right" title="" data-original-title="Allow submission with C++ code" class="fa fa-question text-primary"></i></div>
        </div>
    </div>
    <div class="row col-md-12">
        <div class="col-md-4">
            <div class="pull-right">
                <p>Python</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="pull-left">
                <label class="checkbox checkbox-inline">
                    <input name="lang" value="py" data-language="Python" type="checkbox" ${strs["py"]}><span class="checkbox-material"><span class="check"></span></span>
                </label>
            </div>
        </div>
        <div class="col-md-4">
            <div class="pull-left"><i aria-hidden="true" data-toggle="tooltip" data-placement="right" title="" data-original-title="Allow submission with Python code" class="fa fa-question text-primary"></i></div>
        </div>
    </div>
    <div class="row col-md-12">
        <div class="col-md-4">
            <div class="pull-right">
                <p>Node.JS</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="pull-left">
                <label class="checkbox checkbox-inline">
                    <input name="lang" value="js" data-language="Node.JS" type="checkbox" ${strs["js"]}><span class="checkbox-material"><span class="check"></span></span>
                </label>
            </div>
        </div>
        <div class="col-md-4">
            <div class="pull-left"><i aria-hidden="true" data-toggle="tooltip" data-placement="right" title="" data-original-title="Allow submission with JavaScript code" class="fa fa-question text-primary"></i></div>
        </div>
    </div>
</fieldset>
		`;

					$('[data-toggle="tooltip"]').tooltip();
	};
	let contest = function(contestId) {
		let response = "";
		let helperContest = function(data) {
			//alert("helperData = " + JSON.stringify(data));
			return response = `
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">Edit contest #${data["id"]}</h4>
				</div>
				<div class="modal-body">
<center>
  <span id="info">
    <div class="row">
      <div class="form-group is-empty">
        <input style="font-size:21pt;" minlength="1" required="" name="contest_name" placeholder="Name of the contest" class="form-control" type="text" value="${data["name"]}">
      </div>
      <div class="form-group is-empty">
        <input style="display: inline;" name="password" placeholder="Password (not required)" class="form-control" type="text" value="${data["password"]}">
      </div>
      <i aria-hidden="true" data-toggle="tooltip" data-placement="right" title="" data-original-title="Set password for you contest" class="fa fa-question text-primary"></i>
	  ` + lang(data["langs"])  + `
    </div>
  </span>
  <hr>
  <div class="row" id="tasks">
  ` + tasks(data["tasks"]) + `
  </div>
    <hr>
	    <div class="row">
	      <div class="col-md-10">
			<p style="text-align: center;" id="notifyContest">
			</p>
	      </div>
	      <div class="col-md-2">
	      </div>
		</div>
    <input name="contest_id" value="${data["id"]}" type="hidden">
</center>
</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		  <button onclick="add.task();" class="btn btn-default btn-raised">Add task</button>
		  <button onclick="update.contest();" class="btn btn-default btn-raised">Save changes</button>
        </div>
		`;
		};
		$.ajax({
			type: "GET",
			async: false,
			url: "/lib/create/get_contest.php",
			data: {id: contestId},
			success: function(data) {
				data = data.replace(/'/g, "\"");
				console.log(data);
				data = JSON.parse(data);
				//console.log(data);
				if (data["status"] !== 'success') {
					window.contest_data = {};
				}
				else {
					////alert("HELPER!!!!");
					window.contest_data = data;
				}
			}
		});
		//alert ("contest_data: ${window.contest_data}");
		return helperContest(window.contest_data);
	};
	let task = function(taskId) {
		let response = "";
		let helperTask = function(data) {
			return response = `
<div id="task${taskId}" class="task col-md-12">
    <div class="row form-group">
        <div class="col-md-10">
            <input id="task_name${taskId}" style="font-size:11pt;" minlength="1" required="" name="task_name" placeholder="Name of the task" class="form-control" type="text" value="${data["name"]}">
        </div>
        <div class="col-md-2">
            <a href="#details${taskId}" data-toggle="collapse"><i aria-hidden="false" class="fa fa-chevron-circle-down"></i></a>
        </div>
    </div>

    <span id="details${taskId}" class="collapse in">
	    <div class="row form-group">
	      <div class="col-md-10">
	        <input style="font-size:9pt;" minlength="1" required="" name="description" placeholder="https://" class="form-control" type="text" value="${data["description"]}">
	      </div>
	      <div class="col-md-2">
	        <i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Link to description of the task"></i>
	      </div>
	    </div>
	    <div class="row form-group">
	      <div class="col-md-10">
	        <input style="font-size:9pt;" minlength="1" required="" name="tests" placeholder="https://" class="form-control" type="text" value="${data["tests"]}">
	      </div>
	      <div class="col-md-2">
	        <i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Link to test cases of the task"></i>
	      </div>
	    </div>
	    <div class="row form-group">
	      <div class="col-md-10">
	        <input style="font-size:9pt;" minlength="1" required="" name="input" placeholder="name.*.in" class="form-control" type="text" value="${data["input"]}">
	      </div>
	      <div class="col-md-2">
	        <i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Pattern string for input files of test cases"></i>
	      </div>
	    </div>
	    <div class="row form-group">
	      <div class="col-md-10">
	      	<input style="font-size:9pt;" minlength="1" required="" name="output" placeholder="name.*.sol" class="form-control" type="text" value="${data["output"]}">  
	      </div>
	      <div class="col-md-2">
	        <i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Pattern string for output files of test cases"></i>
	      </div>
	    </div>
	    <div class="row form-group">
	      <div class="col-md-10">
		      <select name="checker" class="form-control">
		        <option value="diff" selected="">diff</option>
		      </select>  
	      </div>
	      <div class="col-md-2">
	        <i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Checker for this task"></i>
	      </div>
	    </div>
	    <div class="row form-group">
	      <div class="col-md-10">
	          <input style="font-size:9pt;" minlength="1" required="" name="star_notation" placeholder="01,02,03,04,05,06,07,08,09,10" class="form-control" type="text" value="${data["star"]}">
	      </div>
	      <div class="col-md-2">
	        <i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="What must be on the place of '*' in file patterns."></i>
	      </div>
	    </div>
	    <div class="row form-group">
	      <div class="col-md-10">
	        <input style="font-size:9pt;" minlength="1" required="" name="points" placeholder="100" class="form-control" type="text" value="${data["points"]}">
	      </div>
	      <div class="col-md-2">
	        <i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Max points for the task"></i>
	      </div>
	    </div>
	    <div class="row form-group">
	      <div class="col-md-10">
	      	<input style="font-size:9pt;" minlength="1" required="" name="tl" placeholder="1s" class="form-control" type="text" value="${data["time"]}">
	      </div>
	      <div class="col-md-2">
	        <i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Time limit for the task"></i>
	      </div>
	    </div>
	    <div class="row form-group">
	      <div class="col-md-10">
	      	<input style="font-size:9pt;" minlength="1" required="" name="ml" placeholder="256M" class="form-control" type="text" value="${data["memory"]}">
	      </div>
	      <div class="col-md-2">
	        <i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Memory limit for the task"></i>
	      </div>
	    </div>
	    <input name="id" value="${taskId}" type="hidden">
	    <div class="row form-group">
	      <div class="col-md-10">
			<input class="btn btn-default btn-raised" value="Update task" onclick="update.task(${taskId})" type="button">
			<input class="btn btn-default btn-raised" value="Remove task from contest" onclick="$('#task${taskId}').remove();" type="button">
	      </div>
	      <div class="col-md-2">
	      </div>
	    </div>
	    <div class="row">
	      <div class="col-md-10">
			<p id="notify">
			</p>
	      </div>
	      <div class="col-md-2">
	      </div>
		</div>
	  </span>
    <div></div>
</div>
<hr>
		`;

					$('[data-toggle="tooltip"]').tooltip();
		};
		$.ajax({
			type: "GET",
			async: false,
			url: "/lib/create/get_task.php",
			data: {id: taskId},
			success: function(data) {
				data = data.replace(/'/g, "\"");
				//console.log("task: " + data);
				data = JSON.parse(data);
				//console.log("task: " + data);
				if (data["status"] !== 'success') {
					window.task_data = {};
				}
				else {
					window.task_data = data;
				}
			}
		});
		return helperTask(window.task_data);
	};
	let tasks = function(taskIds) {
		let tasks = Object.keys(taskIds).reduce(function(a, b) {
			//alert(taskIds[b]);
			return a + task(taskIds[b]);
		}, "");
		//alert(tasks);
		return tasks;
	};
	return {
		contest: contest
	};
}();

let update = function() {
	let task = function(id) {
		$("span#details"+id).fadeOut(300);
		let ser = $('#task' + id + ' input, #task' + id + ' select').serializeArray();
		let params = {};
		for (let x of ser)
		{
			params [x.name] = x.value;
		}
		//alert(params);
		$.post('/lib/create/task_action.php',
			params,
			function (data, status) {
				data = data.trim();
				//alert(data);
				$("#task" + id + " [name=\"id\"]").val(data);
			}
		);
	}
	let contest = function() {
		if ($('[name="contest_name"]').val().trim() === "")
		{
			alert("Invalid contest name");
			return false;
		}

		let tasks = Array.from($('.task input[name="id"]').map(function(a, x) {
				let _id = $(x).val();
				console.log(x);
				console.log($(x));
				console.log($("#task_name" + _id).val() + "\n" + _id);
				return {0: $("#task_name" + _id).val(), 1: _id};
		})).reduce(function(a, b) {
			a[b[0]] = b[1];
			return a;
		}, {});

		//alert(tasks);
		//alert(JSON.stringify(tasks));
		
		let task_points = $('input[name="points"]').map(function(){return $(this).val();});
		let maxp = Object.keys(task_points).reduce(function (res, key) {
			let val = task_points[key];
			if (typeof(val) == "string")
				res += Number(val);
			return res;
		}, 0);

		let langs = Array.from($("input:checkbox").map(function(){
			if ($(this).is(":checked"))
				return {0: $(this).attr("data-language"), 1: $(this).val()};
			else
				return undefined;
		}).filter (x => x != undefined)).reduce(function(a, b) {
			a[b[1]] = b[0];
			return a;
		}, {});

		console.log (JSON.stringify({ name: $('[name="contest_name"]').val(), password: $('[name="password"]').val(), tasks: JSON.stringify (tasks), lang: JSON.stringify (langs), id: $("[name=\"contest_id\"]").val(), max_points: maxp }));
		
		$.ajax({
			type: "POST",
			url: '/lib/create/contest_action.php',
			data: { name: $('[name="contest_name"]').val(), password: $('[name="password"]').val(), tasks: JSON.stringify (tasks), lang: JSON.stringify (langs), id: $("[name=\"contest_id\"]").val(), max_points: maxp },
			beforeSend: function(msg) {
				$("#notifyContest").html(`<i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>`);
			},
			success: function(data, status) {
				$("#notifyContest").html(`<h1 class="text-success">Changes are saved!</h1>`);
			}
		});
	}
	return {
		task: task,
		contest: contest
	};
}();

let add = function() {
	return {
		task: function() {
			$.post('/lib/create/task_action.php',
				{ id: "createEmptyTask" },
				function (data, status) {
					num = data.trim();
					$('#tasks').html ($('#tasks').html () + 
					`<div id="task${num}" class="task col-md-12">
					  <div class="row form-group">
						  <div class="col-md-10">
							<input id="task_name${num}" style="font-size:11pt;" type="text" minlength="1" required="" name="task_name" placeholder="Name of the task" class="form-control"/>
						  </div>
						  <div class="col-md-2">
							<a href="#details${num}" data-toggle="collapse"><i aria-hidden="false" class="fa fa-chevron-circle-down"></i></a>
						  </div>
					  </div>
					  
					  <span id="details${num}" class="collapse in">
						<div class="row form-group">
						  <div class="col-md-10">
							<input style="font-size:9pt;" type="text" minlength="1" required="" name="description" placeholder="https://" class="form-control"/>
						  </div>
						  <div class="col-md-2">
							<i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Link to description of the task"></i>
						  </div>
						</div>
						<div class="row form-group">
						  <div class="col-md-10">
							<input style="font-size:9pt;" type="text" minlength="1" required="" name="tests" placeholder="https://" class="form-control"/>
						  </div>
						  <div class="col-md-2">
							<i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Link to test cases of the task"></i>
						  </div>
						</div>
						<div class="row form-group">
						  <div class="col-md-10">
							<input style="font-size:9pt;" type="text" minlength="1" required="" name="input" placeholder="name.*.in" class="form-control"/>
						  </div>
						  <div class="col-md-2">
							<i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Pattern string for input files of test cases"></i>
						  </div>
						</div>
						<div class="row form-group">
						  <div class="col-md-10">
							<input style="font-size:9pt;" type="text" minlength="1" required="" name="output" placeholder="name.*.sol" class="form-control"/>  
						  </div>
						  <div class="col-md-2">
							<i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Pattern string for output files of test cases"></i>
						  </div>
						</div>
						<div class="row form-group">
						  <div class="col-md-10">
							  <select name="checker" class="form-control">
								<option value="diff" selected="">diff</option>
							  </select>  
						  </div>
						  <div class="col-md-2">
							<i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Checker for this task"></i>
						  </div>
						</div>
						<div class="row form-group">
						  <div class="col-md-10">
							  <input style="font-size:9pt;" type="text" minlength="1" required="" name="star_notation" placeholder="01,02,03,04,05,06,07,08,09,10" class="form-control"/>
						  </div>
						  <div class="col-md-2">
							<i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="What must be on the place of '*' in file patterns."></i>
						  </div>
						</div>
						<div class="row form-group">
						  <div class="col-md-10">
							<input style="font-size:9pt;" type="text" minlength="1" required="" name="points" placeholder="100" class="form-control"/>
						  </div>
						  <div class="col-md-2">
							<i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Max points for the task"></i>
						  </div>
						</div>
						<div class="row form-group">
						  <div class="col-md-10">
							<input style="font-size:9pt;" type="text" minlength="1" required="" name="tl" placeholder="1s" class="form-control"/>
						  </div>
						  <div class="col-md-2">
							<i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Time limit for the task"></i>
						  </div>
						</div>
						<div class="row form-group">
						  <div class="col-md-10">
							<input style="font-size:9pt;" type="text" minlength="1" required="" name="ml" placeholder="256M" class="form-control"/>
						  </div>
						  <div class="col-md-2">
							<i aria-hidden="true" class="fa fa-question text-primary" data-toggle="tooltip" data-placement="right" title="" data-original-title="Memory limit for the task"></i>
						  </div>
						</div>
						<input name="id" value="${num}" type="hidden"/>
						<div class="row form-group">
						  <div class="col-md-10">
							<input class="btn btn-default btn-raised" value="Update task" onclick="update.task(${num})" type="button">
							<input class="btn btn-default btn-raised" value="Remove task from contest" onclick="$('#task${num}').remove();" type="button">
						  </div>
						  <div class="col-md-2">
						  </div>
						</div>
						<div class="row">
						  <div class="col-md-10">
							<p id="notify">
							</p>
						  </div>
						  <div class="col-md-2">
						  </div>
						</div>
					  </span>
					</div>`);

					$('[data-toggle="tooltip"]').tooltip();
				}
			);
		}
	};
}();

function edit_contest(contest_id)
{
	//alert(get.contest(contest_id));
	$('#modal').html(get.contest(contest_id));
	$('#modalRoot').modal();

	$('[data-toggle="tooltip"]').tooltip();
}
