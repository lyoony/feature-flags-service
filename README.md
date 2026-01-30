# Feature Flags Service

A backend service for managing **feature flags** and **A/B experiments** with rule-based evaluation and deterministic rollout.

This project implements a flexible **feature toggle system** that allows enabling or disabling application functionality for:
- specific users
- user roles
- percentage-based rollouts  
  and supports **A/B testing with sticky user assignments**.

---

## 🚀 Tech Stack

- **Node.js**
- **TypeScript**
- **Express**
- **PostgreSQL**
- **Prisma ORM**
- Deterministic hashing for percentage rollout

---

## ✨ Key Features

### Feature Flags
- Enable / disable features dynamically
- Rule-based evaluation with priority
- Supported rule types:
    - `ROLE` — enable feature for a specific role
    - `USER` — enable feature for a specific user
    - `PERCENT` — percentage rollout using deterministic hashing

### A/B Experiments
- Experiments attached to features
- Multiple variants with percentage distribution
- Deterministic user-to-variant assignment
- Sticky assignments (user always gets the same variant)
- Variant payload support (JSON)

---

## 🧠 Architecture Overview

The project follows a **modular layered architecture**:

- **Controller** — HTTP request handling
- **Service** — business logic
- **Repository** — database access (Prisma)
- **Resolver** — feature rule & experiment evaluation
- **Shared** — common types, helpers, hashing utilities

### Feature Evaluation Flow

1. Load feature by key
2. Check if feature is enabled
3. Evaluate feature rules by priority
4. If enabled:
    - resolve experiment (if exists)
    - assign or reuse experiment variant
5. Return evaluation result

---

## 📦 API Examples

### Create feature

```http
POST /api/feature

{
    "key": "new-dashboard",
    "isEnabled": true
}
```

### Add Feature Rule
```http
POST /api/feature/:key/rule

{
    "type": "PERCENT",
    "config": {
        "percentage": 50
    },
    "priority": 1
}
```

### Create A/B Experiment
```http
POST /api/experiment

{
    "featureKey": "new-dashboard",
    "key": "dashboard_experiment"
}
```

### Add Experiment Variants
```http
POST /api/experiment/dashboard_experiment/variants

[
  {
    "key": "A",
    "percentage": 50,
    "payload": {
      "buttonColor": "blue"
    }
  },
  {
    "key": "B",
    "percentage": 50,
    "payload": {
      "buttonColor": "red"
    }
  }
]
```

### Evaluate Feature With Experiment
```http
GET /api/feature/new-dashboard/evaluate?userId=73&role=admin

{
    "enabled": true,
    "reason": "PERCENT",
    "experiment": {
        "key": "B",
        "payload": {
            "buttonColor": "red"
        }
    }
}
```

## 🧪 Deterministic Rollout

Percentage-based rules and experiment variants use **deterministic hashing**, which guarantees that:
- the same user always falls into the same bucket
- rollout behavior is stable across requests
- no external state is required for rollout decisions