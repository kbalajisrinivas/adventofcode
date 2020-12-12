def get_modes(modes):
    return [int(mode) for mode in [modes[2], modes[1], modes[0], modes[3:]]]


class Computer:
    def __init__(self, data):
        self.idx = 0
        self.data = data[:] + [0] * 3000
        self.done = False
        self.output = None
        self.inputs = []
        self.relative_base = 0

    def get_params(self, mode1, mode2, mode3):
        return self.get_param(mode1, 1), self.get_param(mode2, 2), self.get_param(mode3, 3)

    def get_param(self, mode, increment):
        if mode == 0:
            return self.data[self.idx + increment]
        elif mode == 1:
            return self.idx + increment
        else:
            return self.relative_base + self.data[self.idx + increment]

    def add(self, mode1, mode2, mode3):
        param1, param2, param3 = self.get_params(mode1, mode2, mode3)
        print(f"add: param1: {param1}, param2: {param2}, param3: {param3}");
        self.data[param3] = self.data[param1] + self.data[param2]
        print(f"add result: param3:{param3}, ${self.data[param3]}")
        print("=======")
        self.idx += 4

    def multiply(self, mode1, mode2, mode3):
        param1, param2, param3 = self.get_params(mode1, mode2, mode3)
        print(f"multiply: param1: {param1}, param2: {param2}, param3: {param3}");
        self.data[param3] = self.data[param1] * self.data[param2]
        print(f"multiply result: param3:{param3}, ${self.data[param3]}")
        print("=======")
        self.idx += 4

    def take_input(self, mode1):
        param1 = self.get_param(mode1, 1)
        print(f"mode1: {mode1}, param1: {param1}");
        self.data[param1] = self.inputs.pop(0)
        print(f"input at {param1}, value: {self.data[param1]}")
        self.idx += 2

    def create_output(self, mode1):
        print(f"mode1: {mode1}");
        param1 = self.get_param(mode1, 1)
        self.output = self.data[param1]
        self.idx += 2
        return self.output

    def less_than(self, mode1, mode2, mode3):
        param1, param2, param3 = self.get_params(mode1, mode2, mode3)
        print(f"less than param1: {param1}, param2: {param2}, param3: {param3}");
        self.data[param3] = 1 if self.data[param1] < self.data[param2] else 0
        print(f"lessthan result: index: {self.idx}, value1: {self.data[param1]}, value2: {self.data[param2]}, param3:{param3}, ${self.data[param3]}")
        print("=======")
        self.idx += 4

    def equals(self, mode1, mode2, mode3):
        param1, param2, param3 = self.get_params(mode1, mode2, mode3)
        print(f"equals param1: {param1}, param2: {param2}, param3: {param3}");
        self.data[param3] = 1 if self.data[param1] == self.data[param2] else 0
        print(f"equal result: index: {self.idx}, value1: {self.data[param1]}, value2: {self.data[param2]}, param3:{param3}, ${self.data[param3]}")
        print("=======")
        self.idx += 4

    def jump_if_true(self, mode1, mode2, mode3):
        param1, param2, param3 = self.get_params(mode1, mode2, mode3)
        print(f"jumpiftrue param1: {param1}, param2: {param2}, param3: {param3}");
        self.idx = self.data[param2] if self.data[param1] != 0 else self.idx + 3
        print(f"jumpiftrue result: index: {self.idx}, value1: {self.data[param1]}, value2: {self.data[param2]}, param3:{param3}, ${self.data[param3]}")
        print("=======")

    def jump_if_false(self, mode1, mode2, mode3):
        param1, param2, param3 = self.get_params(mode1, mode2, mode3)
        print(f"jumpiffalse param1: {param1}, param2: {param2}, param3: {param3}");
        self.idx = self.data[param2] if self.data[param1] == 0 else self.idx + 3
        print(f"jumpiffalse result: index: {self.idx}, value1: {self.data[param1]}, value2: {self.data[param2]}, param3:{param3}, ${self.data[param3]}")
        print("=======")

    def relative_offset(self, mode1):
        param1 = self.get_param(mode1, 1)
        self.relative_base += self.data[param1]
        self.idx += 2
        print(f"resetting the index to {self.relative_base} at {self.idx}")

    def calculate(self, input_val):
        self.inputs.append(input_val)
        modes = {
            1: lambda: self.add(mode1, mode2, mode3),
            2: lambda: self.multiply(mode1, mode2, mode3),
            3: lambda: self.take_input(mode1),
            5: lambda: self.jump_if_true(mode1, mode2, mode3),
            6: lambda: self.jump_if_false(mode1, mode2, mode3),
            7: lambda: self.less_than(mode1, mode2, mode3),
            8: lambda: self.equals(mode1, mode2, mode3),
            9: lambda: self.relative_offset(mode1)
        }
        while True:
            mode1, mode2, mode3, opcode = get_modes(f"{self.data[self.idx]:05}")
            print(f"mode1: {mode1}, mode2: {mode2}, mode3: {mode3}, opcode: {opcode}");
            if opcode in modes:
                modes[opcode]()              
            elif opcode == 4:
                return self.create_output(mode1)                
            elif opcode == 99:
                self.done = True
                return self.output


with open("src/input.txt") as _file:
    for line in _file:
        input_vals = [int(num) for num in line.split(",")]
        computer = Computer(input_vals)
        print(f"Part 1: {computer.calculate(1)}")

        # computer = Computer(input_vals)
        # print(f"Part 2: {computer.calculate(2)}")