Drop Table if exists Records
Drop Table if exists Tools
Drop Table if exists Employees

Go

Create Table Tools (
    ToolId int identity(1,1) primary key not null,
    ToolName varchar(50) not null,
    Category varchar(50) not null,
    ToolStatus bit not null
)

Create Table Employees (
    EmployeeId int identity(1,1) primary key not null,
    FirstName varchar(50) not null,
    LastName varchar(50) not null,
    Position varchar(50) not null
)

Create Table Records (
    RecordId int identity(1,1) primary key not null,
    DateCheckedOut Date not null,
    DateCheckedIn Date null,
    ToolID int not null,
    constraint FK_Tool foreign key (ToolId) references Tools (ToolId),
    EmployeeID int not null,
    constraint FK_Employee foreign key (EmployeeId) references Employees (EmployeeId)
)

Go

Insert into Tools (ToolName, Category, ToolStatus) values
('Hammer', 'Hand Tools', 1),
('Screwdriver Set', 'Hand Tools', 1),
('Cordless Drill', 'Power Tools', 1),
('Circular Saw', 'Power Tools', 0),
('Wrench Set', 'Hand Tools', 1),
('Angle Grinder', 'Power Tools', 1),
('Measuring Tape', 'Measuring Tools', 1),
('Level', 'Measuring Tools', 1),
('Ladder', 'Safety Equipment', 0),
('Safety Goggles', 'Safety Equipment', 1),
('Air Compressor', 'Power Tools', 1),
('Nail Gun', 'Power Tools', 0),
('Paint Sprayer', 'Painting Tools', 1),
('Paint Roller', 'Painting Tools', 1),
('Workbench Clamp', 'Workshop Tools', 1),
('Socket Set', 'Hand Tools', 1),
('Flashlight', 'Electrical Tools', 1),
('Extension Cord', 'Electrical Tools', 1),
('Heat Gun', 'Power Tools', 1),
('Impact Driver', 'Power Tools', 1),
('Pliers Set', 'Hand Tools', 1),
('Chisel Set', 'Hand Tools', 0),
('Stud Finder', 'Measuring Tools', 1),
('Laser Measure', 'Measuring Tools', 1),
('Hard Hat', 'Safety Equipment', 1),
('Ear Protection', 'Safety Equipment', 1),
('Paint Tray', 'Painting Tools', 1),
('Drop Cloth', 'Painting Tools', 1),
('Bench Grinder', 'Workshop Tools', 0),
('Tool Chest', 'Workshop Tools', 1),
('Voltage Tester', 'Electrical Tools', 1),
('Wire Stripper', 'Electrical Tools', 1)

Insert into Employees (FirstName, LastName, Position) values
('John', 'Miller', 'Technician'),
('Sarah', 'Thompson', 'Supervisor'),
('Alex', 'Nguyen', 'Maintenance Worker'),
('Emily', 'Brown', 'Inventory Clerk'),
('David', 'Wilson', 'Operations Manager'),
('Michael', 'Clark', 'Technician'),
('Jessica', 'Lopez', 'Safety Officer'),
('Ryan', 'Patel', 'Electrician'),
('Amanda', 'Green', 'Maintenance Worker'),
('Daniel', 'Harris', 'Warehouse Associate'),
('Sophia', 'King', 'Inventory Clerk'),
('Ethan', 'Young', 'Supervisor'),
('Olivia', 'Martinez', 'Operations Assistant')


Insert into Records (DateCheckedOut, DateCheckedIn, ToolID, EmployeeID) values
('2026-01-10', '2026-01-12', 1, 2),
('2026-01-15', NULL, 4, 1),
('2026-01-18', '2026-01-20', 11, 3),
('2026-01-05', '2026-01-06', 2, 6),
('2026-01-08', NULL, 5, 4),
('2026-01-11', '2026-01-13', 7, 8),
('2026-01-14', '2026-01-16', 10, 9),
('2026-01-17', NULL, 12, 7),
('2026-01-19', '2026-01-21', 15, 10),
('2026-01-20', NULL, 18, 11),
('2026-01-22', '2026-01-23', 21, 12),
('2026-01-23', NULL, 25, 13),
('2026-01-24', NULL, 30, 5)
