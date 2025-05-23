## Rollin Task Manager

A simple task management application with a React frontend and a mock backend API.

---

### 🚀 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/l-stockwell/task-manager.git
   cd rollin-task-manager
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Run the backend API**

   ```bash
   yarn api
   ```

   * This navigates into the `task-api` folder, installs its dependencies, and starts the server.

4. **Run the frontend**

   ```bash
   yarn dev
   ```

   * Starts the Vite development server for the React app.

---

### 💡 Design Decisions

* **Styled-components**: Enables scoped, dynamic styling and theming. I've separated re-used styling for components and variables into shared files.
* **Custom Hook (`useTasks`)**: Encapsulates task-fetching, creation, updating, and deletion logic for reuse across components.
* **Task Filtering & Pagination**: Utility functions (`filterByStatus`, `filterByDateRange`, `paginate`, `calculateTotalPages`) keep UI logic clean and testable.
* **Modular Structure**: Separate folders for components, hooks, services, utils, and styles to maintain a clear project organization.
* **Testing**: Core functionality testing for the user interactions and unit testing for pure functions are both separated into their respective files.

---

### 🧪 Running Unit Tests

* **Run all tests**

  ```bash
  yarn test
  ```

  * Uses Vitest to execute frontend unit tests.

* **Watch mode**

  ```bash
  yarn test -- --watch
  ```

  * Runs tests in watch mode, re-running on file changes.

* **Test Files**

  * Tests for React components and hooks are in `src/tests/core-functionality.test.tsx`.
  * Utility function tests are in `src/tests/utils.test.ts`.

