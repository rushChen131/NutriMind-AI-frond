# AI菜谱对话助手 - Spec-Kit 技术方案与开发规范（V1.0）

---

# 一、Overview（项目概述）

## 1.1 目标

构建一个基于 **RAG + LLM 的对话式菜谱推荐系统**，支持用户通过自然语言获取个性化菜谱。

## 1.2 核心能力

* 多轮对话理解
* 基于知识库的菜谱推荐（RAG）
* 结构化结果输出（卡片化）
* 用户偏好持续学习（轻量）

---

# 二、Tech Stack（技术选型）

---

## 2.1 Frontend（小程序）

| 类型   | 技术                    |
| ---- | --------------------- |
| 框架   | Taro 3 + React        |
| 语言   | TypeScript            |
| 状态管理 | Zustand               |
| 请求层  | Axios（封装Taro.request） |
| UI   | 自定义组件                 |

---

## 2.2 Backend

| 类型    | 技术                |
| ----- | ----------------- |
| Web框架 | FastAPI           |
| 语言    | Python 3.10       |
| AI框架  | LangChain         |
| 模型    | OpenAI / DeepSeek |
| 向量库   | ChromaDB          |
| 数据库   | MySQL / SQLite    |
| 缓存    | Redis（可选）         |

---

# 三、System Architecture（系统架构）

```text
Frontend（Taro）
    ↓
API Layer（FastAPI）
    ↓
Chat Service（LangChain）
    ↓
RAG Service（Chroma）
    ↓
LLM
```

---

# 四、Design Rules（核心设计规则）

---

## 4.1 Frontend Rules

### R1：组件职责单一

* UI组件不包含业务逻辑
* 数据通过 props 传递

---

### R2：状态管理规范

* 用户信息 → userStore
* 对话数据 → chatStore

---

### R3：消息结构统一

```ts
interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  recipes?: Recipe[]
}
```

---

### R4：交互规则

* 必须支持多轮对话
* 必须支持loading状态
* 必须支持“重新生成”

---

---

## 4.2 Backend Rules

---

### R5：分层架构

```text
API Layer → Service Layer → AI Layer → Data Layer
```

---

### R6：RAG优先原则

* 所有推荐必须先经过检索
* 禁止直接生成（除非fallback）

---

### R7：输出强约束

* 必须返回JSON
* 必须通过schema校验

---

### R8：幂等与容错

* LLM失败 → 重试1次
* 无结果 → fallback策略

---

---

# 五、Data Contract（数据协议）

---

## 5.1 Chat API

### Request

```json
{
  "user_id": "string",
  "message": "string"
}
```

---

### Response

```json
{
  "reply": "string",
  "recipes": [
    {
      "id": "string",
      "name": "string",
      "time": 15,
      "calories": 300,
      "tags": ["减脂"]
    }
  ]
}
```

---

---

# 六、AI Spec（Prompt & RAG规范）

---

## 6.1 System Prompt

```text
你是一个健康饮食助手。

规则：
1. 优先使用提供的菜谱
2. 每次推荐3个
3. 必须输出JSON
4. 推荐需符合用户条件
```

---

## 6.2 RAG Prompt

```text
用户需求：
{query}

候选菜谱：
{context}

请推荐最合适的3个菜谱。
```

---

## 6.3 输出Schema

```json
{
  "recipes": [
    {
      "name": "",
      "reason": ""
    }
  ]
}
```

---

---

# 七、Milestones & ToDoList（核心执行清单）

---

# 🟢 Phase 1：基础能力（MVP）

## 🎯 目标

完成基础对话 + 推荐能力

---

### Backend

* [ ] 初始化FastAPI项目
* [ ] 接入LLM
* [ ] 实现 /chat API
* [ ] 返回mock数据

---

### Frontend

* [ ] 初始化Taro项目
* [ ] 实现聊天页面
* [ ] 实现输入框
* [ ] 接入/chat接口

---

### ✅ 验收标准

* 用户可发送消息
* 页面能显示AI回复

---

---

# 🟡 Phase 2：RAG能力

## 🎯 目标

实现真实菜谱推荐

---

### Backend

* [ ] 准备菜谱数据（≥50）
* [ ] 构建向量库
* [ ] 实现检索逻辑
* [ ] 封装rag_service

---

### Frontend

* [ ] 展示推荐结果（基础列表）

---

### ✅ 验收标准

* 输入“吃什么”可返回真实菜谱

---

---

# 🟠 Phase 3：对话优化

## 🎯 目标

支持多轮对话

---

### Backend

* [ ] 实现对话记忆
* [ ] 条件抽取模块
* [ ] Prompt优化

---

### Frontend

* [ ] 展示历史消息
* [ ] 支持连续对话

---

### ✅ 验收标准

* 用户说“不要鸡蛋”可生效

---

---

# 🔵 Phase 4：产品化

## 🎯 目标

提升用户体验

---

### Backend

* [ ] 结构化输出
* [ ] fallback机制

---

### Frontend

* [ ] 卡片组件
* [ ] 菜谱详情页

---

### ✅ 验收标准

* UI接近产品级
* 无明显AI错误

---

---

# 🟣 Phase 5：用户体系

---

### Backend

* [ ] 用户画像存储
* [ ] 收藏接口

---

### Frontend

* [ ] 收藏功能
* [ ] 我的页面

---

### ✅ 验收标准

* 用户可保存菜谱

---

---

# 八、Non-Goals（本阶段不做）

* 电商系统
* 社交系统
* 复杂营养分析

---

# 九、风险与约束

---

## 风险

* LLM输出不稳定
* RAG命中不准
* 用户留存低

---

## 对策

* JSON强校验
* 增强菜谱数据质量
* 增加快捷入口

---

# 十、Definition of Done（完成标准）

---

## 技术完成

* 所有接口可用
* 无严重错误

---

## 产品完成

* 用户能完成一次完整流程：
  输入 → 推荐 → 查看菜谱

---

## 体验完成

* 响应时间 < 5s
* 推荐结果合理

---

# END
