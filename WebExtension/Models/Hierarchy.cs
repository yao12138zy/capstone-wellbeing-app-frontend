using System;
namespace WebExtension.Models
{
    public class Hierarchy
    {
        public int parent;
        public int child;

        public Hierarchy(int parent, int child)
        {
            this.parent = parent;
            this.child = child;
        }
    }
}

