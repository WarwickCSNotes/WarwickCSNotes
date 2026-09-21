Design patterns are reusable solutions to problems that keep reappearing in software design. They are not snippets you copy in; they are the *shape* of a solution, written down so that another engineer recognises it immediately.

They belong to the **implementation** phase of the software lifecycle (Requirements Analysis → System Design → Implementation and Unit Testing → Integration and System Testing → Operation and Maintenance).

> [!note]- Why do we use design patterns?
> - Provide code development strategies.
> - Optimise code that might otherwise bloat or become difficult to maintain.
> - Reduce the possibility of errors being introduced.
> - Provide a **common language** of implementation; "put a decorator on it" is a complete design instruction to another engineer.

# Pattern Classifications

There are three main classes of design pattern.

> [!definition] The three families
> - **Creational**; deal with object creation. Factory, Abstract Factory, Builder, Prototype, Singleton.
> - **Structural**; ease design/implementation by identifying simple ways to realise the *relationships between entities*, and manage the composition of objects into larger structures. Proxy, Decorator, Adaptor, Flyweight (plus Bridge, Composite, Facade, Pipes and Filters).
> - **Behavioural**; concerned with the *communication between objects*, and the common communication patterns between them. Strategy, Observer, Command, ...

> [!note]- What is the difference between a structural and a behavioural pattern?
> - **Structural:** how objects are *put together*; who holds a reference to whom, and what interface sits between the client and the service object.
> - **Behavioural:** how objects *talk* to each other; who calls whom, when, and what gets passed.
>
> Structural patterns mostly change the class diagram; behavioural patterns mostly change the sequence diagram.

# Creational Patterns

Creational patterns abstract away, or simplify, the act of building complex objects.

## Factory Pattern

A factory hides the `new` keyword behind a method. The client asks the factory for "a shape" or "a transport", and the factory decides which concrete class to instantiate and hands back something typed as the interface.

```java
public interface Shape {
    void draw();
}

public class ShapeFactory {
    public Shape getShape(String type) {
        if (type.equalsIgnoreCase("CIRCLE"))    return new Circle();
        if (type.equalsIgnoreCase("RECTANGLE")) return new Rectangle();
        return null;
    }
}

// The client never mentions Circle or Rectangle by name.
Shape s = new ShapeFactory().getShape("CIRCLE");
s.draw();
```

> [!note]- Why is that better than just calling the constructor?
> - The client is coupled only to the `Shape` **interface**, not to the concrete classes.
> - Adding a `Triangle` means editing one factory, not every call site.
> - Construction logic (which subclass, with what defaults, from what config file) lives in exactly one place.

> [!note]- Distinguish the factory variants.
> - **Simple factory**; one class with a method that switches on a parameter (the example above). Not strictly a GoF pattern, but usually what is meant in conversation.
> - **Factory method**; the creation call is a method on the base class that *subclasses override*, so each subclass decides what gets built.
> - **Abstract factory**; provides an interface for creating **related or dependent** objects without specifying their concrete classes. E.g. a `GUIFactory` whose `WindowsFactory` and `MacFactory` implementations each produce a matching button *and* checkbox, so you can never mix a Windows button with a Mac checkbox.

## The Other Creational Patterns

> [!note]- Builder, Prototype and Singleton.
> - **Builder**; separates the construction of an object from its representation, so the same construction process can create different representations. Good when a constructor would otherwise need fifteen arguments.
> - **Prototype**; create new objects by *cloning* an existing configured instance rather than constructing from scratch.
> - **Singleton**; ensures a class has only a single instance, with a global point of access to it.

# Structural Patterns

Every structural pattern in the lecture puts an extra class between the client and the service object. What differs is *why*.

## Proxy Pattern

A proxy is a **placeholder** for another object; another level of indirection. We may want to reference an entity (a film, an image, a large database) without instantiating it: think embedded web content, the cost of streaming, image rights, or copyright jurisdiction. Where we want to *load on demand*, the implementation solution is a proxy.

> [!example] Real-world analogy
> Your debit card is a proxy for cash. It performs the same function, but one basically redirects to the other.

```java
public interface Graphic {
    void draw();
}

public class Image implements Graphic {
    private byte[] data;

    public Image(String filename) {
        data = loadImage(filename);   // expensive
    }

    public void draw() { drawToScreen(data); }
}

public class ImageProxy implements Graphic {
    private String filename;
    private Image content;

    public ImageProxy(String filename) {
        this.filename = filename;
        content = null;               // nothing loaded yet
    }

    public void draw() {
        if (content == null) {        // load only on the first draw request
            content = new Image(filename);
        }
        content.draw();               // forward to the concrete image
    }
}
```

Note that the proxy implements the *same interface* as the real object, so the client cannot tell them apart.

> [!note]- Name and describe the six uses of a proxy.
> | Use | What it does |
> |---|---|
> | **Virtual proxy** | Lazy initialisation; delay loading a resource-heavy object until just before it is needed. |
> | **Protection proxy** | Access control; prevent access to features based on the client's credentials. |
> | **Remote proxy** | Offers the client the full functionality of a service object living on another server, and handles the networking issues. |
> | **Logging proxy** | Keeps track of access and requests to a service object, separately from the service itself. |
> | **Caching proxy** | Saves the results of an object for a set length of time; useful if the service is computationally intensive or returns a lot of data. |
> | **Smart referencing** | Essentially garbage collection; drop a heavyweight service object when no client is using it, and retrieve it again later as needed. |

> [!note]- Proxy: advantages and disadvantages.
> **Advantages**
> - Can hide parts of the service object, so it can be changed or controlled without the client knowing.
> - Lets you manage the object life cycle.
> - Provides availability even when the service object is not ready or available.
> - New proxies can be introduced without changing the service or the clients.
>
> **Disadvantages**
> - More classes, so more complexity in the code base.
> - Another step in getting the response, so the service may be slower.

## Decorator Pattern

Decorators (also called **wrappers**) add new behaviour to objects **at runtime**. They keep the original object and wrap it with additional functionality.

> [!example] Why not just use subclasses?
> Say we have an app that sends pre-written messages to multiple platforms, with a `Message` subclass per platform: Twitter, Instagram, Facebook, Slack, Discord, WhatsApp. Now we want to send to several at once; we would need `Twitter+Insta`, `Facebook+Slack`, `Discord+WhatsApp`, `Twitter+Discord+Slack`... The hierarchy explodes combinatorially.
>
> Inheritance is **static**. Wrappers let us assemble the combination we need at runtime, stacking one wrapper per platform.

```java
public interface Shape {
    void draw();
}

public abstract class ShapeDecorator implements Shape {
    protected Shape decoratedShape;

    public ShapeDecorator(Shape decoratedShape) {
        this.decoratedShape = decoratedShape;
    }

    public void draw() { decoratedShape.draw(); }
}

public class RedShapeDecorator extends ShapeDecorator {
    public RedShapeDecorator(Shape decoratedShape) { super(decoratedShape); }

    public void draw() {
        decoratedShape.draw();
        setRedBorder(decoratedShape);
    }

    private void setRedBorder(Shape decoratedShape) {
        System.out.println("Border Color: Red");
    }
}

Shape circle    = new Circle();
Shape redCircle = new RedShapeDecorator(new Circle());
```

The wrapper has the same methods/interface as the thing it wraps, but does something *before or after* calling the original object's version of the method. At runtime we check the options the client asked for and apply the needed wrappers, almost like a stack.

> [!note]- What does the decorator buy us here?
> - The original classes (`Circle` and `Rectangle`) remain unchanged.
> - The `Shape` class structure is no more complex, despite the increased functionality.
> - The decorating behaviour is separated from the original code (largely).

> [!note]- Decorator: advantages and disadvantages.
> **Advantages**
> - Extends behaviour without adding several new subclasses.
> - An object's responsibilities become dynamic at runtime.
> - Unlike subclasses, wrappers can be **combined**.
> - Promotes the single responsibility principle; divide one large class's responsibilities into several smaller ones.
>
> **Disadvantages**
> - Removing a wrapper from the middle of the stack later is difficult.
> - Hard to implement in a way that is not order-dependent; wrappers often must be added in a specific order.
> - The initial code layout can look messy.

> [!warning] Proxy vs Decorator
> They are almost identical in structure (both insert a class with the same interface between the client and the service object), but they aim to achieve very different things. A proxy *controls access* to the object (and usually creates and manages it itself); a decorator *adds behaviour* to an object it was handed.

## Adaptor Pattern

An adaptor allows output from one object to be used by another; bridging the gap between a service that needs one type of data and a class that provides a different type.

> [!example] The speedometer
> We have a `Speedometer` built for an American system, measuring in mph. We are building an extension for a European system, which wants km/h.
>
> - Change the speedometer itself → we may break huge parts of the original system (every existing caller assumes mph).
> - Write a brand-new speedometer → we repeat a lot of work.
> - So: wrappers to the rescue.

```java
class Speedometer {
    private int speed = 0;
    public void updateSpeed(int i) { speed = i; }
    public int getSpeed() { return speed; }
}

class EuroSpeedometer extends Speedometer {
    public void updateSpeed(int i) { super.updateSpeed(i * 0.6214); }    // km/h in, mph stored
    public int getSpeed()          { return super.getSpeed() * 1.6093; } // mph stored, km/h out
}
```

Nearly every method just calls the superclass version; only where data crosses the boundary do we perform a conversion.

> [!note]- What is the object-composition form of the adaptor?
> Instead of inheriting from the thing you are adapting, you **inherit the interface the client expects** and hold the object you are converting as a field:
>
> - `AdaptorObject` implements `InterfaceObject` (`getD1(): int`, `getD2(): String`).
> - It holds a private `DataObject do` (`getD1(): double`, `getD2(): char`).
> - `getD1()` returns `(int) do.getD1()`; `getD2()` returns `(String) do.getD2()`.
>
> This is the version you use when you cannot (or should not) subclass the adaptee; e.g. it is third-party, or `final`.

> [!note]- Adaptor: advantages and disadvantages.
> **Advantages**
> - Promotes the single responsibility principle; one object handles the conversion, another handles the processing.
> - New adaptors can be introduced without heavy refactoring of existing code.
>
> **Disadvantages**
> - It is a hit to the complexity of the code.
> - Depending on the size of your code base, converting the original service object may be easier.

## Flyweight Pattern

The flyweight pattern lets us fit **more objects in memory**. Where many objects share identical, large properties, we hold **one** copy that all of them reference, instead of one copy each.

> [!example] Orcs
> An `OrcNPC` has `name` (1kb), `health` (1kb), `weapon` (5mb), `style: NPCAI` (50mb) and `texture: Map` (800mb). With 2GB of NPC memory that is a maximum of **2.34 orcs**; not a game.
>
> But every orc uses the same weapon, AI and texture. Extract those into a shared `OrcData` class and each orc costs 2kb, with one copy of the heavy data shared between them → **1.14 million orcs**. Now we have a game.

> [!note]- How do you implement a flyweight?
> 1. Identify the resources or data that every copy of the object references identically (the **intrinsic** state).
> 2. Extract that data out into a shared/static class.
> 3. Leave the per-object data (the **extrinsic** state; name, health, position) on the object itself.
>
> Common in video games, text rendering (one glyph object per character) and particle systems.

> [!note]- Flyweight: advantages and disadvantages.
> **Advantages**
> - Saves memory in programs with lots of objects using the same resource.
>
> **Disadvantages**
> - Some data may need to be **recalculated** every time a method is called, because it depends on context; saving memory but increasing compute time.
> - Code becomes more complicated, and tracing the full state of an object becomes an issue (its state is split across two places).

## Structural Patterns: "DLC Content"

> [!note]- Bridge, Composite, Facade and Pipes-and-Filters.
> - **Bridge**; decouple an abstraction from its implementation so that the two vary independently.
> - **Composite**; a tree structure of objects where every object (leaf or branch) has the same interface.
> - **Facade**; create a simplified interface of an existing interface, to ease usage in common tasks.
> - **Pipes and filters**; a chain of processes where the output of each process is the input of the next.

# Behavioural Patterns

Behavioural patterns are concerned with the communication between objects. They are the subject of the following lecture, but one is worth knowing now because it comes up constantly.

## Strategy Pattern

> [!info] Not in this lecture's slides
> Strategy is a **behavioural** pattern, so it is not in the structural-patterns deck. It is included here because it is the behavioural pattern you are most likely to reach for; and because it is the standard answer to "how do I swap an algorithm at runtime?"

The strategy pattern defines a family of interchangeable algorithms, puts each one in its own class, and makes them swappable at runtime. The object that uses them (the *context*) holds a reference to one strategy and delegates to it, without knowing which one it has.

```java
public interface RouteStrategy {
    Route build(Point a, Point b);
}

public class DrivingStrategy implements RouteStrategy { /* ... */ }
public class WalkingStrategy implements RouteStrategy { /* ... */ }
public class CyclingStrategy implements RouteStrategy { /* ... */ }

public class Navigator {                       // the context
    private RouteStrategy strategy;

    public void setStrategy(RouteStrategy s) { this.strategy = s; }

    public Route route(Point a, Point b) {
        return strategy.build(a, b);           // no idea which algorithm this is
    }
}
```

Without it, `Navigator` would be one class containing a growing `if (mode == DRIVING) ... else if (mode == WALKING) ...` block, and every new travel mode would mean editing the class everything else depends on.

> [!note]- Strategy: advantages and disadvantages.
> **Advantages**
> - Swap algorithms at runtime.
> - Isolates the implementation details of an algorithm from the code that uses it.
> - Replaces large conditional blocks; adding an algorithm means adding a class, not editing the context (open/closed principle).
> - Strategies are easy to unit test in isolation.
>
> **Disadvantages**
> - More classes and objects for what may be a couple of lines of difference.
> - The client must know the strategies exist and be able to pick between them.
> - If you have two algorithms and they will never change, an `if` is honestly fine.

> [!note]- Strategy vs Decorator vs Adaptor: they all wrap something!
> - **Strategy**; the wrapped object *is* the behaviour; the context delegates the whole job to it and swaps it out. Changes *which* algorithm runs.
> - **Decorator**; wraps an object of the same interface and *adds* to what it does, and can be stacked. Changes *how much* happens.
> - **Adaptor**; wraps an object with a *different* interface and translates. Changes the *shape* of the call, not the behaviour.

# Comparison Table

Every pattern named in the lecture, grouped by classification.

| Pattern | Class | Problem it solves | Key idea | Example from the module |
|---|---|---|---|---|
| **Factory** | Creational | Client code is coupled to concrete classes it should not know about | A method decides which subclass to instantiate and returns the interface type | `ShapeFactory.getShape("CIRCLE")` |
| **Abstract Factory** | Creational | Need families of related objects that must match each other | An interface for creating related/dependent objects without naming their concrete classes | Matching sets of UI widgets |
| **Builder** | Creational | Construction of a complex object is tangled with its representation | Separate construction from representation, so one process can create different representations | Step-by-step object assembly |
| **Prototype** | Creational | Constructing a fresh object is expensive or fiddly | Clone a configured existing instance | Copying a pre-set object |
| **Singleton** | Creational | Multiple instances of a class would conflict | Ensure a class has exactly one instance | One config or logger object |
| **Proxy** | Structural | Want to reference an object without instantiating it, or control access to it | A placeholder with the same interface that forwards to the real object | `ImageProxy` loading the image only on `draw()` |
| **Decorator** | Structural | Adding feature combinations by subclassing explodes the hierarchy | Wrap the object in same-interface wrappers at runtime, stackable | `RedShapeDecorator(new Circle())` |
| **Adaptor** | Structural | Two components expect incompatible data types/interfaces | Convert one interface into the one the client expects | `EuroSpeedometer` converting mph ↔ km/h |
| **Flyweight** | Structural | Thousands of objects each duplicate the same heavy data | Share one copy of the common (intrinsic) state between all instances | `OrcData` shared by every `OrcNPC` |
| **Bridge** | Structural | Abstraction and implementation are locked together | Decouple them so the two vary independently | DLC slide |
| **Composite** | Structural | Client must treat individual objects and groups of them differently | Tree of objects where every node shares one interface | DLC slide |
| **Facade** | Structural | An existing interface is too complicated for common tasks | A simplified interface placed in front of it | DLC slide |
| **Pipes and Filters** | Structural | A job is a sequence of independent transformations | Chain processes so each one's output is the next one's input | DLC slide |
| **Strategy** | Behavioural | An algorithm must change at runtime; large conditional blocks | Family of interchangeable algorithms behind one interface, held by a context | Next lecture / see above |

> [!tip] The trick that makes structural patterns click
> Proxy, Decorator and Adaptor have *the same class diagram*. If a question shows you a wrapper, do not identify it by structure; identify it by intent: **control access** (proxy), **add behaviour** (decorator), **translate an interface** (adaptor).

# There Are a Lot of Design Patterns Used in Software Engineering That Are Not in the Slides

> [!info] Commonly used patterns the lecture does not cover
> The lecture covers the creational and structural GoF patterns plus a teaser for the behavioural ones. In practice you will meet plenty of others constantly:
>
> **Behavioural (GoF, mostly next lecture)**
> - **Observer / Publish–Subscribe**; objects subscribe to an event source and get notified when it changes. Every UI event listener, every message queue.
> - **Strategy**; interchangeable algorithms behind one interface (covered above).
> - **Command**; wrap a request as an object so it can be queued, logged or undone. Undo/redo stacks.
> - **State**; an object changes its behaviour when its internal state changes, as if it changed class. Finite state machines.
> - **Template Method**; a base class fixes the skeleton of an algorithm and lets subclasses fill in the steps.
> - **Iterator**; traverse a collection without exposing how it is stored. `for (x : collection)` in most languages.
> - **Chain of Responsibility**; pass a request along a chain until something handles it. HTTP middleware.
> - **Mediator**; objects talk through a central hub instead of directly to each other.
> - **Memento**; capture and restore an object's state without breaking encapsulation. Save games, snapshots.
> - **Visitor**; add new operations to a class hierarchy without editing the classes. Compiler ASTs.
> - **Interpreter**; represent a grammar and evaluate sentences written in it.
>
> **Architectural and enterprise patterns (not GoF at all)**
> - **MVC / MVP / MVVM**; split an application into model, view and controller/presenter/view-model. The default shape of basically every GUI and web framework.
> - **Dependency Injection / Inversion of Control**; hand an object its collaborators instead of letting it construct them. Spring, Angular, and most testable code.
> - **Repository**; a collection-like interface in front of your data store, so business logic never sees SQL.
> - **Data Access Object (DAO)** and **Active Record**; two competing ways of mapping objects to database rows.
> - **Unit of Work**; batch up changes and commit them as a single transaction.
> - **Object Pool**; reuse expensive objects (database connections, threads) instead of creating and destroying them.
> - **Null Object**; a do-nothing implementation of an interface, so callers never have to null-check.
> - **Circuit Breaker**, **Retry**, **Bulkhead**; resilience patterns for distributed systems.
> - **Service Locator**, **Event Sourcing**, **CQRS**, **Sidecar**, **Saga**; the microservice vocabulary.
>
> Patterns are also **language-dependent**: a lot of GoF exists to work around limitations of 1990s C++ and Java. In a language with first-class functions, Strategy and Command are frequently just a function passed as an argument, and Singleton is often just a module.

# Cautionary Tale

> [!warning] Do not blindly apply these patterns
> - It is easy to get carried away applying patterns; which is why they are often said to need a high level of skill to use effectively.
> - Blindly applying patterns can *minimise* the benefit the solution offers, particularly since some patterns undo each other's benefits. (A flyweight saves memory; a caching proxy over the same objects hands it straight back.)
> - **Code first, recognise the inefficiency, then apply the pattern**; not the other way around.

> [!note]- Why do nearly all structural patterns increase complexity?
> In object-oriented programming, we get flexibility through having more classes. Since these patterns are about making code more adaptable and flexible, they require more classes. That trade (complexity now for adaptability later) is exactly the thing you are judging when you decide whether a pattern is worth it.

# Summary

> [!summary] In case you have been asleep this entire lecture
> - We are in the **implementation** phase of the software lifecycle, using **software design patterns**.
> - Patterns provide development strategies, optimise code that would otherwise bloat, reduce the possibility of errors, and give a common language of implementation.
> - **Creational**; deal with object creation (Factory, Abstract Factory, Builder, Prototype, Singleton).
> - **Structural**; ease the design/implementation relationships between entities (Proxy, Decorator, Adaptor, Flyweight, plus Bridge, Composite, Facade, Pipes and Filters).
> - **Behavioural**; communication between objects (Strategy, Observer, Command, ...).
