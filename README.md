# Dijkstras-Algorithm-Map-Nav.github.io
Used Dijkstra's Algorithm for finding shortest distance between two nodes


Introduction

Dijkstra's algorithm allows us to find the shortest path between any two vertices of a graph.
What does Dijkstra’s algorithm do? Given a weighted graph, a starting point, and an endpoint within the graph itself, the algorithm finds the “minimum path” that connects the two points, that is the sequence of arcs that minimizes the sum of the weights and therefore, in the case of Maps, minimizes the estimated travel time.
 
How does Dijkstra’s Algorithm work? Dijkstra's Algorithm works on the basis that any subpath B -> D of the shortest path A -> D between vertices A and D is also the shortest path between vertices B and D


 It is used in Google Maps and geographical Maps to find the shortest path and also used in    IP routing to find Open shortest Path and in telephone networks.
Background
Built a User Interface using HTML5, CSS, and JavaScript by understanding the algorithm behind the Google maps which can find the shortest path between any two nodes selected by the user.
 
  
Dijkstra's Algorithm basically starts at the node that you choose (the source node) and it analyzes the graph to find the shortest path between that node and all the other nodes in the graph.
The algorithm keeps track of the currently known shortest distance from each node to the source node and it updates these values if it finds a shorter path.
Once the algorithm has found the shortest path between the source node and another node, that node is marked as "visited" and added to the path.
The process continues until all the nodes in the graph have been added to the path. This way, we have a path that connects the source node to all other nodes following the shortest path possible to reach each node.
 
 
Project

Used Html5 and CSS to design a webpage having canvas for displaying the map and a menu bar that shows the coordinates of the map in x and y directions when the user hovers the mouse on the map.
 JavaScript is used for giving some response to the webpage that was created and an XML file is used to store the data that contains coordinates of the nodes and links between the nodes on the map.

Whenever the user clicks the starting and the destination nodes on the map, JavaScript retrieves the node details from the XML file and displays the shortest path over the map.
As shown in the figure below

Comparing  path with Google Map:

In most of the cases, the path we get matches with Google map suggested path but
In some cases even though the path is short Google maps suggest paths based on different factors like traffic, and based on a vehicle we choose.
Dijkstra’s algorithm always finds the fastest route. It has been shown mathematically that Dijkstra always finds the shortest path, as long as there is at least one possible route. This fact sometimes plays against us: often, in fact, in order to save a few seconds, the navigator sends us on “alternative” roads against common sense, and that we would never have dreamed of travel. On the other hand, however, it is extremely versatile, in fact, it is always able to find the fastest route. Moreover, it can take into account additional information such as traffic information or the presence of congestion, simply by going to change the weights on the graph.


Summary

With Dijkstra's Algorithm, you can find the shortest path between nodes in a graph. Particularly, you can find the shortest path from a node (called the "source node") to all other nodes in the graph, producing a shortest-path tree.
This algorithm is used in GPS devices to find the shortest path between the current location and the destination. It has broad applications in industry, especially in domains that require modeling networks.
 
Conclusion

We get to know how Google maps and GPS devices work and the algorithms they used to suggest short and best paths. And successfully implemented a simple Navigation map using Dijkstra's Algorithm.
