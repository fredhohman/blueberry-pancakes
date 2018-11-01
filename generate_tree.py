import itertools

import numpy as np
import matplotlib.pyplot as plt

def inverse_flip(node, i):
    '''Given a node and an index, return the node
    that results from having previously flipped node[i]'''
    return node[:i] + node[i+1:][::-1] + [node[i]]

def expand(node, indent="", current_depth=0, print_tree=False):
    '''Recursive method for printing out all configurations
    that lead to a given node. Returns the largest depth reached
    by a child node.'''
    if print_tree:
        print(indent, current_depth,node)
    
    largest_depth = current_depth
    for i in range(len(node) - 1):
        if i + node[i] == len(node): # we can do a flip
            new_node = inverse_flip(node, i)
            
            # recurse and keep track of the deepest child node
            t_largest_depth = expand(
                new_node,
                indent + "   ",
                current_depth + 1,
                print_tree = print_tree
            )
            largest_depth = max(
                largest_depth,
                t_largest_depth
            )

    return largest_depth

# print out an example tree
expand([5,4,3,2,1], print_tree=True)


# plot depth of longest tree vs. num pancakes
xs = []
ys = []
for x in range(4,8):
    largest_depth = expand(list(range(1,x+1))[::-1])
    
    xs.append(x)
    ys.append(largest_depth)

plt.figure()
plt.plot(xs, ys)
plt.show()
plt.close()