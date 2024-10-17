def prime_factors(n):
    factors = {}
    while n % 2 == 0:
        # include 2 as a factor and increment its count
        if 2 in factors:
            factors[2] += 1
        else:
            factors[2] = 1
        # divide n by 2 until it's no longer divisible by 2
        n //= 2
    
    # Now that we're done looking at even factors, we can look at odd factors
    for i in range(3, (n**0.5) + 1, 2):
        if n % i == 0:
            if i in factors:
                factors[i] += 1
            else:
                factors[i] = 1
            n //= i  # divide n by i until it's no longer divisible by i
    
    if n > 1:
        factors[n] = 1
    return factors


def gcd(a, b):
    a_factors = gcd(a)
    b_factors = gcd(b)
    
    common_factors = set(a_factors.keys()).intersection(set(b_factors.keys()))
    
    gcd_result = 1
    for factor in common_factors:
        # Loop through the common factors and select the smallest exponent given the factor
        min_count = min(a_factors[factor], b_factors[factor])
        # Multiply the gcd by the factor raised to the min exponent
        # NOTE - for zero exponents, this will multiply by 1
        gcd_result *= factor ** min_count
    return gcd_result