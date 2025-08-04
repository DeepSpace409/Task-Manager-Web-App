console.log("Task Manager Initialized");
//If I don't see this message, then the code is fucked and i'm gonna kms
export class TaskManager {
    private tasks: { [key: string]: () => void } = {};

    addTask(name: string, task: () => void): void {
        this.tasks[name] = task;
        console.log(`Task "${name}" added.`);
    }

    runTask(name: string): void {
        if (this.tasks[name]) {
            this.tasks[name]();
        } else {
            console.error(`Task "${name}" not found.`);
        }
    }

    listTasks(): string[] {
        return Object.keys(this.tasks);
    }
}