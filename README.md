# mic-webgme
Miniproject 1 for course Model Integrated Computing
Project Domain: Workflow


The target domain is Workflow. Since there are various kinds of workflow diagrams bieng used for diverse kinds of applications, I have chosen the Activity Diagram from Computer Science. As my class project would be to create a course design tool for the teachers, I have kept that audience in mind.

Metamodel:
The language is modeled to build diagrams which can capture flow of task executions. There are basically four types of constructs modeled: Task, Port, Param and Connection (Wire/Line). The lines that connect a port to another port signifies the flow of execution from one task to another. A task can basically be of two types: Primitive and Compound. Any task can have only one Input Port signifying there would be only one way to enter into executing a task. But there may be multiple ways to exit from a task. Parallel and Join tasks are special types which can have only one exit point. The purpose of the Parallel task is to spawn sevaral tasks in parallel. But the spawned parallel tasks must then join into a Join task. After the join task there is again a single line of execution.

The diagram is modeled in a way to build models which would be reusable. Compound tasks can have its own definition containing Primitives and Compound nodes. Generally when an activity is to be modeled, that activity should be a Compound type model thus making it to be usable for defining other higher level models. Primitives may have input and output ports defined as well as params but can not contain any other tasks within.

Each task can take in a set of Parameters, which not necessarily be only input parameters, they may well be output parameters. The language supports for two basic types of parameters: Stringa and Float (Number).

There is also support to create folders to organize the models and a meta-model called Language to keep the basic activity modeling constructs organized within that.


Modeling Constructs Supported:
- Task
	- Compound Task
	- Primitive
	- Parallel
	- Join
- Flow Ports
	- Flow In
	- Flow Out
- Parameters
	- String
	- Number
- Conncections:
	- Parameters
	- Flow ins and Flow Outs




Example Model:
I have designed two models, one is a library to design quiz and another is a sample quiz. The quiz library has support to create an interactive experience of quiz. The sample quiz demonstrated the use of the reusablility of models as well as parallel execution of tasks. From this diagram using model transformation plugins, code can be generated. The target was not to design the low level instructions but to facilitate an audience like a Teacher to create the high level flow of an adaptive quiz.

