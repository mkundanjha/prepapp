const dsaJunior = [
  { cat: 'dsa', level: 'junior', q: 'What data structure follows Last In, First Out (LIFO)?', opts: ['Queue', 'Stack', 'Heap', 'Graph'], ans: 1, exp: 'A stack removes the most recently added item first, which is the LIFO rule.' },
  { cat: 'dsa', level: 'junior', q: 'Which data structure is best for checking whether a value exists quickly by key?', opts: ['Array scan', 'Hash map', 'Linked list', 'Binary tree traversal'], ans: 1, exp: 'A hash map gives near O(1) average lookup by key, which is why it is the default fast membership structure.' },
  { cat: 'dsa', level: 'junior', q: 'If an array is sorted, which search algorithm usually improves over linear scan?', opts: ['DFS', 'Binary search', 'Topological sort', 'Union-find'], ans: 1, exp: 'Binary search uses sorted order to discard half the remaining search space each step.' },
  { cat: 'dsa', level: 'junior', q: 'What is the time complexity of scanning an array once from left to right?', opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], ans: 2, exp: 'A single pass touches each element once, so the work grows linearly with input size.' },
  { cat: 'dsa', level: 'junior', q: 'Which traversal visits nodes level by level in a tree?', opts: ['Inorder', 'Postorder', 'Breadth-first search', 'Backtracking'], ans: 2, exp: 'Breadth-first search processes the tree level by level, typically using a queue.' },
  { cat: 'dsa', level: 'junior', q: 'What does a queue follow?', opts: ['LIFO', 'FIFO', 'Sorted order only', 'Random order'], ans: 1, exp: 'A queue is First In, First Out, so the earliest item added is processed first.' },
]

const dsaMid = [
  { cat: 'dsa', level: 'mid', q: 'Average time complexity of hash map lookup?', opts: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'], ans: 2, exp: 'Hash maps compute an index via a hash function, so lookup is O(1) on average. Worst-case degradation happens only with heavy collisions.' },
  { cat: 'dsa', level: 'mid', q: 'Two pointers advantage over brute force on a sorted array?', opts: ['Less memory', 'O(n²) → O(n)', 'Works unsorted', 'Better duplicates'], ans: 1, exp: 'On sorted input, two pointers scan once, often reducing pair-search work from O(n²) to O(n).' },
  { cat: 'dsa', level: 'mid', q: 'What does BFS use to track nodes to visit?', opts: ['Stack', 'Recursion', 'Queue', 'Hash set'], ans: 2, exp: 'BFS is level-order traversal, so it uses a FIFO queue. DFS uses a stack or recursion instead.' },
  { cat: 'dsa', level: 'mid', q: 'Binary search requires the array to be?', opts: ['Sorted', 'Unique elements', 'In a hash map', 'Even length'], ans: 0, exp: 'Binary search only works when ordering lets you discard half the remaining search space on each comparison.' },
  { cat: 'dsa', level: 'mid', q: 'Min-heap insertion time complexity?', opts: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], ans: 1, exp: 'Insert appends, then sifts up along the heap height, which is O(log n).' },
  { cat: 'dsa', level: 'mid', q: 'Which sliding window variant handles variable-size windows?', opts: ['Fixed window', 'Dynamic window', 'Two pointer only', "Kadane's"], ans: 1, exp: 'A dynamic sliding window expands and shrinks based on a condition, such as distinct-character limits.' },
  { cat: 'dsa', level: 'mid', q: 'What is the time complexity of building a heap from N elements?', opts: ['O(n log n)', 'O(n)', 'O(log n)', 'O(n²)'], ans: 1, exp: 'Bottom-up heapify is O(n), even though repeated insertions would be O(n log n).' },
  { cat: 'dsa', level: 'mid', q: 'Which traversal of a BST yields values in sorted order?', opts: ['Preorder', 'Inorder', 'Postorder', 'Level order'], ans: 1, exp: 'Inorder traversal visits left subtree, node, then right subtree, which is sorted for a BST.' },
]

const dsaSenior = [
  { cat: 'dsa', level: 'senior', q: 'Best structure for an O(1) LRU cache?', opts: ['Queue + set', 'Array + hash map', 'Hash map + doubly linked list', 'Min-heap + trie'], ans: 2, exp: 'The hash map gives O(1) lookup and the doubly linked list gives O(1) insert, move, and remove for recency updates.' },
  { cat: 'dsa', level: 'senior', q: 'Most common approach for Top K frequent elements when k << n?', opts: ['Nested loops', 'Min-heap of size k', 'Linked list only', 'Binary search'], ans: 1, exp: 'Count frequencies, then keep the current top k in a min-heap. That avoids sorting everything.' },
  { cat: 'dsa', level: 'senior', q: 'Which algorithm detects a cycle in a linked list using O(1) extra space?', opts: ['Dijkstra', 'KMP', 'Floyd slow/fast pointers', 'Union-find'], ans: 2, exp: 'Floyd cycle detection moves one pointer one step and another two steps. If they meet, a cycle exists.' },
  { cat: 'dsa', level: 'senior', q: 'What is a monotonic stack commonly used for?', opts: ['Tree balancing', 'Next greater/smaller element queries', 'Hash collisions', 'Graph coloring'], ans: 1, exp: 'A monotonic stack preserves an order so you can answer nearest greater or smaller element questions in linear time.' },
  { cat: 'dsa', level: 'senior', q: 'Dijkstra shortest-path algorithm assumes edge weights are?', opts: ['All equal', 'Non-negative', 'Prime numbers', 'Unique'], ans: 1, exp: 'Dijkstra relies on the greedy property that once the smallest tentative distance is chosen, it stays optimal. Negative weights break that.' },
  { cat: 'dsa', level: 'senior', q: 'What do path compression and union by rank optimize?', opts: ['Trie insertions', 'Heap deletes', 'Disjoint-set union-find', 'Binary search'], ans: 2, exp: 'They keep union-find trees shallow, making find and union operations almost constant time in practice.' },
  { cat: 'dsa', level: 'senior', q: 'Primary benefit of a prefix-sum array?', opts: ['O(1) range-sum queries after preprocessing', 'Sorted inserts', 'O(1) deletions', 'Graph traversal'], ans: 0, exp: 'Once prefix sums are built, any range sum can be answered with one subtraction.' },
  { cat: 'dsa', level: 'senior', q: 'Space complexity of recursive DFS with V vertices?', opts: ['O(1)', 'O(E)', 'O(V)', 'O(V+E)'], ans: 2, exp: 'In the worst case, recursion depth can reach V, so call-stack space is O(V).' },
]

const systemDesignJunior = [
  { cat: 'sd', level: 'junior', q: 'What is the main purpose of a cache?', opts: ['Encrypt data', 'Store frequently used data for faster reads', 'Replace the primary database', 'Validate JWTs'], ans: 1, exp: 'A cache keeps frequently accessed data closer to the application so repeated reads are faster.' },
  { cat: 'sd', level: 'junior', q: 'Why use a load balancer in front of multiple app servers?', opts: ['To compress responses', 'To distribute traffic across instances', 'To store logs', 'To replace DNS'], ans: 1, exp: 'A load balancer spreads traffic so no single server handles all requests.' },
  { cat: 'sd', level: 'junior', q: 'What is a primary benefit of a database index?', opts: ['Smaller tables', 'Faster lookups for indexed queries', 'Guaranteed ordering everywhere', 'Automatic backups'], ans: 1, exp: 'Indexes help the database find matching rows faster without scanning the whole table.' },
  { cat: 'sd', level: 'junior', q: 'What does horizontal scaling mean?', opts: ['Adding more machines', 'Adding more RAM to one machine', 'Normalizing tables', 'Reducing latency with gzip'], ans: 0, exp: 'Horizontal scaling means adding more servers rather than making one server larger.' },
  { cat: 'sd', level: 'junior', q: 'Why are retries common in distributed systems?', opts: ['Because all failures are permanent', 'Because transient network or dependency failures happen', 'Because retries guarantee ordering', 'Because retries remove duplicates'], ans: 1, exp: 'Many failures are temporary, so a retry can succeed without human intervention.' },
  { cat: 'sd', level: 'junior', q: 'What is a common reason to use a message queue?', opts: ['To tightly couple services', 'To decouple producers from consumers', 'To replace application logs', 'To avoid using databases'], ans: 1, exp: 'Queues decouple systems so work can be buffered and processed asynchronously.' },
]

const systemDesignMid = [
  { cat: 'sd', level: 'mid', q: 'Purpose of an idempotency key in a payment API?', opts: ['Encrypt the request', 'Prevent duplicate processing on retry', 'Authenticate the client', 'Rate limit the client'], ans: 1, exp: 'Idempotency keys let a client safely retry. The server recognizes duplicates and returns the original outcome instead of re-executing.' },
  { cat: 'sd', level: 'mid', q: 'Which cache strategy writes to cache and DB simultaneously?', opts: ['Cache-aside', 'Write-through', 'Write-back', 'Read-through'], ans: 1, exp: 'Write-through updates cache and database together. It simplifies reads but adds write latency.' },
  { cat: 'sd', level: 'mid', q: 'Main trade-off of adding a database index?', opts: ['Faster reads, slower writes', 'Faster writes, slower reads', 'Less storage', 'More consistency'], ans: 0, exp: 'Indexes speed up lookups but every insert, update, or delete must maintain index state too.' },
  { cat: 'sd', level: 'mid', q: 'What does "at-least-once delivery" mean in message queues?', opts: ['Exactly once', 'May duplicate, never lost', 'May be lost, never duplicated', 'Always in order'], ans: 1, exp: 'The system retries until delivery succeeds, which prevents loss but means duplicates are possible.' },
  { cat: 'sd', level: 'mid', q: 'Consistent hashing is primarily used for?', opts: ['Password hashing', 'Distributing load with minimal reshuffling', 'Encrypting DB keys', 'Search indexing'], ans: 1, exp: 'When nodes are added or removed, consistent hashing remaps only a fraction of keys instead of nearly all of them.' },
  { cat: 'sd', level: 'mid', q: 'Key advantage of using a CDN?', opts: ['Reduces DB load', 'Serves static content closer to users', 'Real-time sync', 'Handles authentication'], ans: 1, exp: 'CDNs cache content at edge locations, reducing origin load and lowering latency for users far from the primary region.' },
  { cat: 'sd', level: 'mid', q: 'What problem does the outbox pattern solve?', opts: ['Slow DB reads', 'Dual write between DB and message queue', 'High memory usage', 'Rate limiting'], ans: 1, exp: 'The outbox pattern stores the event in the same DB transaction as the business write, then publishes it asynchronously.' },
  { cat: 'sd', level: 'mid', q: 'What is horizontal scaling?', opts: ['Upgrade one server CPU/RAM', 'Add more servers to distribute load', 'Partition a database', 'Add more indexes'], ans: 1, exp: 'Horizontal scaling adds instances. Vertical scaling makes one machine bigger.' },
  { cat: 'sd', level: 'mid', q: 'Primary risk when serving reads from a read replica?', opts: ['Higher CPU only', 'Replica lag causing stale reads', 'Writes become impossible', 'No failover support'], ans: 1, exp: 'Replicas are asynchronous in many systems, so clients may see stale data shortly after a write.' },
  { cat: 'sd', level: 'mid', q: 'Purpose of a dead-letter queue?', opts: ['Speed up successful messages', 'Store messages that repeatedly fail processing', 'Preserve message ordering', 'Compress large payloads'], ans: 1, exp: 'A DLQ isolates poison messages so the main queue can keep moving while failures are inspected or replayed later.' },
]

const systemDesignSenior = [
  { cat: 'sd', level: 'senior', q: 'In CAP theorem, what does a CP system sacrifice?', opts: ['Consistency', 'Availability', 'Partition tolerance', 'Latency'], ans: 1, exp: 'During a partition, a CP system rejects some requests to preserve consistency.' },
  { cat: 'sd', level: 'senior', q: 'Main advantage of cursor-based pagination over offset pagination at scale?', opts: ['Works only with SQL', 'Avoids scanning large offsets and is more stable under inserts', 'Needs no sort order', 'Always returns total count'], ans: 1, exp: 'Cursor pagination uses a position marker, so it avoids slow deep offsets and reduces duplicate or skipped rows during concurrent writes.' },
  { cat: 'sd', level: 'senior', q: 'What problem does optimistic locking help prevent?', opts: ['Cold starts', 'Lost updates from concurrent writes', 'Cache misses', 'Schema drift'], ans: 1, exp: 'Optimistic locking checks a version or timestamp before commit so one writer does not silently overwrite another.' },
  { cat: 'sd', level: 'senior', q: 'Which rate-limiting algorithm naturally supports controlled bursts?', opts: ['Round robin', 'Token bucket', 'Consistent hashing', 'Two-phase commit'], ans: 1, exp: 'Token bucket accumulates tokens over time, allowing bursts up to bucket capacity while preserving an average rate.' },
  { cat: 'sd', level: 'senior', q: 'What is the main role of a circuit breaker?', opts: ['Encrypt traffic', 'Stop sending requests to a failing dependency temporarily', 'Increase throughput by batching', 'Replace retries'], ans: 1, exp: 'Circuit breakers fail fast when a dependency is unhealthy, which limits cascading failures and helps recovery.' },
  { cat: 'sd', level: 'senior', q: 'When is the saga pattern typically used?', opts: ['For single-row updates', 'For distributed workflows that need compensating actions', 'For cache invalidation only', 'For CDN routing'], ans: 1, exp: 'A saga breaks a multi-service transaction into steps, each with a compensating action if a later step fails.' },
  { cat: 'sd', level: 'senior', q: 'For a Redis cache with no TTL on most keys, which eviction policy best preserves hot items?', opts: ['noeviction', 'allkeys-lfu', 'volatile-ttl', 'volatile-lru'], ans: 1, exp: 'Redis allkeys-lfu can evict from all keys while preserving frequently accessed items, which fits cache-heavy workloads without TTLs.' },
  { cat: 'sd', level: 'senior', q: 'What makes "exactly-once" messaging hard in practice?', opts: ['Networks are too fast', 'Producer, broker, and consumer failures create duplicate paths', 'Queues cannot persist data', 'Retries are impossible'], ans: 1, exp: 'Exactly-once requires coordinated handling of publishes, acknowledgments, retries, and side effects across failure boundaries.' },
  { cat: 'sd', level: 'senior', q: 'Why add jitter to retry backoff?', opts: ['To make retries deterministic', 'To avoid synchronized retry storms', 'To reduce payload size', 'To guarantee ordering'], ans: 1, exp: 'Jitter spreads retries over time so thousands of clients do not hammer the same dependency at identical intervals.' },
  { cat: 'sd', level: 'senior', q: 'What does a correlation ID primarily help with?', opts: ['Database indexing', 'Tracing a request across services and logs', 'JWT validation', 'Load balancing'], ans: 1, exp: 'A correlation ID ties logs, traces, and downstream calls to the same request path, which is critical for debugging distributed systems.' },
]

const goJunior = [
  { cat: 'go', level: 'junior', q: 'Which keyword declares a variable in Go?', opts: ['var', 'let', 'const only', 'define'], ans: 0, exp: 'Go uses var for variable declarations, and short declarations with := inside functions.' },
  { cat: 'go', level: 'junior', q: 'What is the zero value of an int in Go?', opts: ['nil', '1', '0', '-1'], ans: 2, exp: 'Numeric types default to zero when not explicitly initialized.' },
  { cat: 'go', level: 'junior', q: 'Which package is commonly used for formatted output in Go?', opts: ['fmt', 'io', 'bytes', 'strconv'], ans: 0, exp: 'The fmt package provides Printf, Println, and related formatted I/O helpers.' },
  { cat: 'go', level: 'junior', q: 'What does := do in Go?', opts: ['Declares and assigns inside a function', 'Creates a pointer', 'Imports a package', 'Starts a goroutine'], ans: 0, exp: 'The := syntax is the short variable declaration form used inside functions.' },
  { cat: 'go', level: 'junior', q: 'How do you start a goroutine?', opts: ['async fn()', 'go fn()', 'start fn()', 'thread fn()'], ans: 1, exp: 'Prefixing a function call with go starts it in a new goroutine.' },
  { cat: 'go', level: 'junior', q: 'Which collection stores key-value pairs in Go?', opts: ['slice', 'map', 'channel', 'struct tag'], ans: 1, exp: 'A map stores values by key and is Go’s built-in key-value collection.' },
]

const goMid = [
  { cat: 'go', level: 'mid', q: 'What does defer do in Go?', opts: ['Runs immediately', 'Runs when surrounding function returns', 'Skips the call', 'Runs in a goroutine'], ans: 1, exp: 'defer schedules a call to run just before the surrounding function returns. Multiple deferred calls execute in LIFO order.' },
  { cat: 'go', level: 'mid', q: 'What is a goroutine?', opts: ['A type of channel', 'A lightweight thread managed by Go runtime', 'A mutex', 'A function pointer'], ans: 1, exp: 'Goroutines are lightweight concurrent executions managed by the Go scheduler rather than directly by the OS.' },
  { cat: 'go', level: 'mid', q: 'What happens when you send on a closed channel?', opts: ['Blocks forever', 'Returns zero value', 'Panics', 'Returns an error'], ans: 2, exp: 'Sending on a closed channel panics. Only the sending side should close a channel when no more values will be sent.' },
  { cat: 'go', level: 'mid', q: 'Zero value of a pointer in Go?', opts: ['0', '""', 'false', 'nil'], ans: 3, exp: 'Pointers default to nil. Dereferencing nil triggers a runtime panic.' },
  { cat: 'go', level: 'mid', q: 'make(chan int, 5) creates?', opts: ['Unbuffered channel', 'Buffered channel capacity 5', 'Channel for 5 goroutines', 'Slice of 5 ints'], ans: 1, exp: 'The second argument sets channel buffer capacity. Sends block only when that buffer is full.' },
  { cat: 'go', level: 'mid', q: 'Purpose of sync.Mutex?', opts: ['Create goroutines', 'Prevent concurrent access to shared data', 'Synchronise time', 'Lock a channel'], ans: 1, exp: 'A mutex protects shared mutable state so only one goroutine accesses the critical section at a time.' },
  { cat: 'go', level: 'mid', q: 'What does blank identifier _ do in Go imports?', opts: ['Ignores the package', 'Imports only for side effects (init)', 'Creates anonymous variable', 'Skips error handling'], ans: 1, exp: 'A blank import runs the imported package init logic without bringing exported names into scope.' },
  { cat: 'go', level: 'mid', q: 'Which keyword implements polymorphism in Go?', opts: ['struct', 'interface', 'type', 'extends'], ans: 1, exp: 'Go uses interfaces for polymorphism. Types satisfy interfaces implicitly by implementing the required methods.' },
  { cat: 'go', level: 'mid', q: 'What is the recommended place for context.Context in a function signature?', opts: ['Last parameter', 'First parameter after receiver', 'Global variable', 'Embedded in a struct field'], ans: 1, exp: 'Go conventions put context.Context first so cancellation, deadlines, and request scoping are explicit through the call chain.' },
]

const goSenior = [
  { cat: 'go', level: 'senior', q: 'After calling context.WithTimeout, what should you usually do with the cancel function?', opts: ['Ignore it', 'Defer cancel()', 'Return it to the database', 'Call it only on panic'], ans: 1, exp: 'The Go docs recommend deferring cancel to release timers and other resources even when the timeout is not hit.' },
  { cat: 'go', level: 'senior', q: 'Why prefer errors.Is(err, target) over err == target for wrapped errors?', opts: ['It is faster for all cases', 'It unwraps error chains correctly', 'It converts errors to strings', 'It suppresses panics'], ans: 1, exp: 'errors.Is checks wrapped error chains, so it still matches a sentinel error after additional context has been added.' },
  { cat: 'go', level: 'senior', q: 'What is true about concurrent writes to a regular Go map?', opts: ['Always safe', 'Safe with slices.Grow', 'Can panic and must be synchronized', 'Only unsafe on Windows'], ans: 2, exp: 'Regular maps are not safe for concurrent mutation. Use synchronization such as a mutex or a sync.Map where appropriate.' },
  { cat: 'go', level: 'senior', q: 'If an interface holds a typed nil pointer, is the interface itself nil?', opts: ['Always yes', 'Always no because type information is present', 'Only in tests', 'Only for slices'], ans: 1, exp: 'An interface value is nil only when both its dynamic type and value are nil. A typed nil pointer still gives the interface a type.' },
  { cat: 'go', level: 'senior', q: 'Which standard library package introduced structured logging?', opts: ['log/json', 'fmtlog', 'log/slog', 'runtime/log'], ans: 2, exp: 'Go added structured logging to the standard library through log/slog, which uses key-value attributes and pluggable handlers.' },
  { cat: 'go', level: 'senior', q: 'What does a select statement with a default case enable for channel operations?', opts: ['Guaranteed ordering', 'Non-blocking send/receive attempts', 'Automatic retries', 'Goroutine cancellation'], ans: 1, exp: 'If no channel case is ready, the default branch runs immediately, which makes the operation non-blocking.' },
  { cat: 'go', level: 'senior', q: 'What do you get when receiving from a closed channel?', opts: ['Panic every time', 'Zero value and ok=false', 'Compile error', 'Blocked goroutine forever'], ans: 1, exp: 'A receive on a closed channel succeeds immediately, yielding the element zero value and ok=false.' },
  { cat: 'go', level: 'senior', q: 'Which command is used to detect data races in Go tests?', opts: ['go test -cover', 'go vet', 'go test -race', 'go fix'], ans: 2, exp: 'The race detector instruments the program and reports unsynchronized conflicting memory access during test execution.' },
  { cat: 'go', level: 'senior', q: 'Which standard library package provides generic helpers such as Sort and BinarySearch for slices?', opts: ['sortx', 'slices', 'container/list', 'reflect'], ans: 1, exp: 'The slices package provides generic slice helpers in the standard library, including sorting and binary search utilities.' },
]

export const QUESTION_BANK = {
  dsa: {
    junior: dsaJunior,
    mid: dsaMid,
    senior: dsaSenior,
  },
  sd: {
    junior: systemDesignJunior,
    mid: systemDesignMid,
    senior: systemDesignSenior,
  },
  go: {
    junior: goJunior,
    mid: goMid,
    senior: goSenior,
  },
}

export const QUESTIONS = Object.values(QUESTION_BANK)
  .flatMap(levels => Object.values(levels).flat())
