# GCD
GCD, which stands for "Greatest Common Divisor," is a fundamental concept in number theory. It represents the largest positive integer that divides two or more numbers without leaving a remainder. Understanding GCD is crucial in various areas of mathematics and computer science, including algorithm design and cryptography.

To build a foundational mental model for GCD, think of it as finding the largest "shared factor" between two or more numbers. Here's a more detailed explanation of GCD and a mental model to help you grasp the concept:

1. **Definition of GCD:**
   - GCD of two or more integers is the largest positive integer that divides each of the given numbers without leaving a remainder.
   - It's often denoted as "gcd(a, b)" for two numbers "a" and "b," or "gcd(a, b, c)" for three numbers "a," "b," and "c."

2. **Visualizing GCD as Common Factors:**
   - Imagine you have two or more numbers represented by dots on a number line.
   - The GCD is the largest line segment (or divisor) that can be drawn vertically, connecting the dots such that it evenly divides each number.

3. **Mental Model - The Divisibility Test:**
   - Think of GCD as a test for divisibility. If a number is divisible by another number, their GCD will be the smaller number.
   - For example, if you have numbers 12 and 18, the GCD is 6 because both 12 and 18 are divisible by 6 (12 ÷ 6 = 2 and 18 ÷ 6 = 3).

4. **Prime Factorization:**
   - To find the GCD of two numbers, you can break them down into their prime factors and then identify the common prime factors.
   - For example, to find the GCD of 48 and 60:
     - Prime factorization of 48: 2^4 * 3^1
     - Prime factorization of 60: 2^2 * 3^1 * 5^1
     - Common prime factors: 2^2 * 3^1
     - GCD(48, 60) = 2^2 * 3^1 = 12

5. **Useful Properties:**
   - GCD has some useful properties, such as the fact that gcd(a, b) = gcd(b, a) (it's commutative) and gcd(a, 0) = a (the GCD of any number and 0 is the number itself).

6. **Applications:**
   - GCD is used in various algorithms, such as the Euclidean Algorithm for finding the GCD of two numbers efficiently.
   - It's also used in simplifying fractions, solving linear Diophantine equations, and cryptography, where it helps in generating encryption keys and ensuring the security of cryptographic systems.

So, in summary, think of the GCD as the largest shared factor or common divisor between two or more numbers. It's a fundamental concept in number theory and has practical applications in various areas of mathematics and computer science.

## Examples
Let's work through a few more examples of finding the GCD (Greatest Common Divisor) using prime factorization. We'll use the prime factorization method to identify the common prime factors and calculate the GCD of various pairs of numbers:

**Example 1:** Find the GCD of 24 and 36.

- Prime factorization of 24: 2^3 * 3^1 (the prime factors are 2 and 3).
- Prime factorization of 36: 2^2 * 3^2 (the prime factors are 2 and 3).

To find the GCD, we identify the common prime factors and take the lowest exponent for each prime factor:

- Common prime factor: 2 (with exponents 3 and 2).
- Common prime factor: 3 (with exponents 1 and 2).

So, GCD(24, 36) = 2^2 * 3^1 = 12.

**Example 2:** Find the GCD of 45 and 75.

- Prime factorization of 45: 3^2 * 5^1 (the prime factors are 3 and 5).
- Prime factorization of 75: 3^1 * 5^2 (the prime factors are 3 and 5).

To find the GCD, we identify the common prime factors and take the lowest exponent for each prime factor:

- Common prime factor: 3 (with exponents 2 and 1).
- Common prime factor: 5 (with exponents 1 and 2).

So, GCD(45, 75) = 3^1 * 5^1 = 15.

**Example 3:** Find the GCD of 18 and 28.

- Prime factorization of 18: 2^1 * 3^2 (the prime factors are 2 and 3).
- Prime factorization of 28: 2^2 * 7^1 (the prime factors are 2 and 7).

To find the GCD, we identify the common prime factors and take the lowest exponent for each prime factor:

- Common prime factor: 2 (with exponents 1 and 2).

So, GCD(18, 28) = 2^1 = 2.

These examples demonstrate how to find the GCD of two numbers by identifying their prime factors and taking the lowest exponent for each common prime factor. This method works for any pair of positive integers and is a fundamental concept in number theory.

Let's go through a few more examples of finding the GCD (Greatest Common Divisor) using prime factorization:

**Example 4:** Find the GCD of 60 and 96.

- Prime factorization of 60: 2^2 * 3^1 * 5^1 (the prime factors are 2, 3, and 5).
- Prime factorization of 96: 2^5 * 3^1 (the prime factors are 2 and 3).

To find the GCD, we identify the common prime factors and take the lowest exponent for each prime factor:

- Common prime factor: 2 (with exponents 2 and 5).
- Common prime factor: 3 (with exponents 1 and 1).

So, GCD(60, 96) = 2^2 * 3^1 = 12.

**Example 5:** Find the GCD of 63 and 81.

- Prime factorization of 63: 3^2 * 7^1 (the prime factors are 3 and 7).
- Prime factorization of 81: 3^4 (the prime factor is 3).

To find the GCD, we identify the common prime factors and take the lowest exponent for each prime factor:

- Common prime factor: 3 (with exponents 2 and 4).

So, GCD(63, 81) = 3^2 = 9.

**Example 6:** Find the GCD of 14 and 15.

- Prime factorization of 14: 2^1 * 7^1 (the prime factors are 2 and 7).
- Prime factorization of 15: 3^1 * 5^1 (the prime factors are 3 and 5).

To find the GCD, we identify the common prime factors and take the lowest exponent for each prime factor:

- There are no common prime factors between 14 and 15.

So, GCD(14, 15) = 1 (since there are no common prime factors).

These additional examples illustrate how to find the GCD of two numbers by identifying their prime factors and determining the common prime factors with their respective exponents. Depending on the numbers, the GCD may be a non-trivial factor, such as 2, 3, 5, or it may be 1 if there are no common prime factors.

### Code
To find the GCD (Greatest Common Divisor) of two numbers using their prime factorizations. Here's a Python function that demonstrates this approach:

```python
import math

def prime_factors(n):
    factors = {}
    
    # Check for and factor out all occurrences of 2
    while n % 2 == 0:
        if 2 not in factors:
            factors[2] = 1  # Initialize the factor with an exponent of 1
        else:
            factors[2] += 1  # Increment the exponent for the factor 2
        n //= 2  # Divide n by 2 until it's no longer divisible by 2
    
    # Check for and factor out other prime factors (odd numbers)
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        while n % i == 0:
            if i not in factors:
                factors[i] = 1  # Initialize the factor with an exponent of 1
            else:
                factors[i] += 1  # Increment the exponent for the current factor
            n //= i  # Divide n by the current factor until it's no longer divisible
    
    # If n is still greater than 1, it is a prime factor itself
    if n > 1:
        factors[n] = 1  # Initialize the last prime factor with an exponent of 1
    
    return factors

def gcd(a, b):
    # Find prime factors of a and b
    factors_a = prime_factors(a)
    factors_b = prime_factors(b)

    common_factors = set(factors_a.keys()) & set(factors_b.keys())

    # Calculate the GCD based on common prime factors and their exponents
    gcd_result = 1
    for factor in common_factors:
        gcd_result *= factor ** min(factors_a[factor], factors_b[factor])

    return gcd_result

# Example usage:
num1 = 60
num2 = 96
result = gcd(num1, num2)
print("GCD of", num1, "and", num2, "is", result)
```

In this code:

1. The `prime_factors` function calculates the prime factors of a given number `n` and returns them as a dictionary with prime factors as keys and their exponents as values.

2. The `gcd` function finds the prime factors of both input numbers `a` and `b`, then identifies the common prime factors. It calculates the GCD by multiplying these common prime factors with their minimum exponents.

You can use this code to find the GCD of any two positive integers by calling the `gcd` function with those numbers as arguments.

----
The major part of this algorithm that's possibly not obvious is the `prime_factors` function. It uses a common algorithm for finding the prime factors of a number, which is to divide the number by all possible factors until it's no longer divisible. For example, to find the prime factors of 60, we divide it by 2, 3, 5, and 7 until it's no longer divisible by any of these numbers. The remaining number is 1, which is a prime factor itself.

The for-loop after 2 is also quite unintuitive so let's break it down futher.

The expression is commonly used in finding prime factors of a number, has the form:

```python
for i in range(3, int(math.sqrt(n)) + 1, 2):
   ...
```

Let's break down the mechanics and logic behind it to make it more intuitive:

1. **`range(3, int(math.sqrt(n)) + 1, 2)`**:
   - `range(start, stop, step)` generates a sequence of numbers starting from `start` and ending before `stop`, incrementing by `step`. In this case:
   - `start` is set to `3`, which is the first odd prime number greater than `2`.
   - `stop` is set to `int(math.sqrt(n)) + 1`. This means we will generate numbers up to and including the square root of `n`. Adding `1` is necessary to include the square root itself in the range.
   - `step` is set to `2`, which ensures that only odd numbers are generated. This is a key optimization because even numbers greater than 2 cannot be prime, so we skip them.

2. **Loop Iteration**:
   - The loop iterates through all odd numbers from `3` up to and including the square root of `n`.
   - It does so by incrementing by `2` each time, so it considers only odd numbers.

3. **Prime Factor Testing**:
   - Inside the loop, the code tests whether `n` is divisible by the current value of `i`. If it is, it means that `i` is a prime factor of `n`.
   - If `i` is a prime factor, the code divides `n` by `i` as many times as possible while `n` remains divisible by `i`. This process effectively "factors out" the prime factor `i` from `n`.
   - The loop continues until `n` is no longer divisible by `i`, at which point it moves on to the next odd number `i`.

The key intuition here is that you only need to test factors up to the square root of `n` because if a number has a prime factor greater than its square root, it must also have a corresponding prime factor smaller than its square root. This is a well-known optimization in prime factorization algorithms, and it reduces the number of iterations needed to find prime factors.

By using this logic and iteration strategy, the code efficiently factors out the prime factors of `n`, making it a more efficient way to find the prime factors of a number compared to testing all numbers up to `n`.

If that' still not clear consider the following...

When i see n^2, i think pictorally of a square. Where one edge of the square is defined as n. Same goes for n^3, i think of a cube. Can you help me understand given this pattern of intuition?

Let's build on that intuitive pattern of thinking about powers of numbers like n^2 and n^3 using visual representations.

1. **n^2 (Square)**:
   - When you think of n^2, imagine a square where one edge has a length of 'n' units.
   - This square has 'n' rows and 'n' columns of smaller squares.
   - The total number of smaller squares inside this larger square is n^2.

   ```
   n x n = n^2
   |--- n units ---|
   ```

   For example, if n = 3, you have a 3x3 square with 9 smaller squares inside.

2. **n^3 (Cube)**:
   - When you think of n^3, envision a cube where each edge has a length of 'n' units.
   - This cube has 'n' rows, 'n' columns, and 'n' layers of smaller cubes.
   - The total number of smaller cubes inside this larger cube is n^3.

   ```
   n x n x n = n^3
   |------ n units ------|
   ```

   For example, if n = 2, you have a 2x2x2 cube with 8 smaller cubes inside.

These visualizations help you understand the concept of powers of numbers in a geometric way. For n^2, you're thinking about the area of a square with 'n' units on each side. For n^3, you're thinking about the volume of a cube with 'n' units along each edge. This geometric perspective can be quite intuitive and helps in grasping the concept of exponentiation.

If it's n^4, then i would think of n cubes stacked on top of each other. So When you're dealing with n^4, you can extend your visual representation to thinking about a collection of n^3 cubes. Each of these n^3 cubes represents a smaller cube of n units along each edge, and you have n^4 of these smaller cubes in total.

So, for n^4:

Visualize a collection of n^3 cubes, where each cube has 'n' units along each edge.
You have a total of n^4 of these smaller cubes.
This pattern of visualizing the exponentiation of numbers using geometric shapes can be a helpful and intuitive way to grasp the concept and magnitude of these mathematical expressions.

So Let's map the concept of square roots back to the square root bounding expression used in prime factorization. The square root of a number, denoted as √n, represents the length of one side of a square when squared equals n. Now, let's apply this to prime factorization:

1. **n^2 and Square Root Bounding**:
   - Imagine a square where one edge has a length of √n.
   - The area of this square is √n * √n = n.
   - In the context of prime factorization, when we say we're checking factors up to the square root of 'n,' it's like we're considering all the potential factors within this square.

   ```
   n = √n * √n
   |--- √n units ---|
   ```

2. **n^3 and Cube Root Bounding** (Extension):
   - Extending the analogy, imagine a cube where each edge has a length of √n.
   - The volume of this cube is √n * √n * √n = n^(3/2).
   - While we don't usually use cube root bounding in prime factorization, you can think of it as an extension of the idea for n^3.

   ```
   n^(3/2) = √n * √n * √n
   |------ √n units ------|
   ```

By considering factors up to the square root of 'n,' we're effectively constraining our search to within the boundaries of a square that has 'n' as its area. This constraint is a clever optimization because, as mentioned earlier, if a number has a prime factor greater than its square root, it must also have a corresponding prime factor smaller than its square root. This significantly reduces the number of potential factors we need to consider and makes the prime factorization process more efficient.

## WHY: Applications
Here are some additional examples of how the greatest common divisor (GCD) is used in data structures and algorithm applications:

1. **Binary Heaps**:
   - In binary heap data structures (e.g., min-heap or max-heap), the GCD is used to determine the relative positions of elements based on their priorities.
   - It is commonly used in heap-related operations, such as heapify, to maintain the heap property during insertions and deletions.

2. **Sieve of Eratosthenes**:
   - The Sieve of Eratosthenes algorithm for finding prime numbers uses the GCD to efficiently mark or sieve out multiples of prime numbers.
   - GCD calculations help identify the common multiples that need to be marked as non-prime.
   ```python
   def sieve_of_eratosthenes(limit):
    # Create a boolean list "is_prime" and initialize all entries to True
    is_prime = [True] * (limit + 1)
    is_prime[0] = is_prime[1] = False  # 0 and 1 are not prime

    # Start with the first prime number, 2
    p = 2

    while p**2 <= limit:
        # If is_prime[p] is not changed, it's a prime
        if is_prime[p]:
            # Mark all multiples of p as not prime
            for i in range(p**2, limit + 1, p):
                is_prime[i] = False
        p += 1

    # Collect the prime numbers into a list
    primes = [p for p in range(2, limit + 1) if is_prime[p]]
    return primes

   # Example usage:
   limit = 30
   prime_numbers = sieve_of_eratosthenes(limit)
   print("Prime numbers up to", limit, "are:", prime_numbers)
   ```

3. **Hashing Functions**:
   - GCD can be used in custom hashing functions to reduce collisions. It helps ensure that hash codes generated for different input values are relatively prime.
   - This property can be useful in open addressing collision resolution techniques.

4. **Euclidean Algorithm**:
   - The Euclidean algorithm, which calculates the GCD of two numbers, is a fundamental building block in various algorithms and data structures.
   - It is used in modular arithmetic, cryptography, and solving linear Diophantine equations.

5. **Graph Algorithms**:
   - GCD can be used in graph algorithms, such as finding the lowest common ancestor (LCA) of nodes in a tree or directed acyclic graph.
   - It is used to calculate the depths of nodes in some tree structures.

6. **Dynamic Programming**:
   - In some dynamic programming problems, GCD calculations can be used to optimize the computation of certain values.
   - It is particularly useful when dealing with sequences of numbers.

7. **Cyclic Buffers and Queues**:
   - GCD can be employed to determine the size of buffers or queues in systems with cyclic or periodic behavior.
   - It helps ensure that data structures are appropriately sized to handle periodic data.

8. **Performance Optimization**:
   - GCD can be used to optimize memory allocation and alignment in low-level programming, particularly in systems programming and embedded systems.

9. **Resource Allocation**:
   - In resource allocation problems, GCD can be used to determine the optimal allocation of resources among tasks or processes with periodic demands.

10. **Signal Processing**:
    - In digital signal processing, GCD can be used to analyze and process signals with periodic components, such as filtering and Fourier analysis.

These examples highlight how GCD is a versatile mathematical concept that finds applications in various aspects of data structures, algorithms, and optimization problems across computer science and engineering domains. It is a fundamental tool for solving problems efficiently and effectively.